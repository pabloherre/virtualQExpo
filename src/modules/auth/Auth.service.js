import store from '../../setup/store';
import { login, loginFail, loginPending, logout } from './Auth.actions';
import AsyncStorage from '@react-native-community/async-storage';
import { authenticate } from '../../setup/feathersClient';

export default class AuthService {
  static login = async credentials => {
    credentials = { strategy: 'local', ...credentials };
    if (!credentials.email || !credentials.password) {
      throw new Error('Must provide valid credentials');
    }

    try {
      store.dispatch(loginPending());
      const result = await authenticate.create(credentials);
      store.dispatch(login());
      AsyncStorage.setItem('accessToken', result.accessToken);
      return result.user;
    } catch (e) {
      store.dispatch(loginFail());
    }
  };

  static logout = () => {
    try {
      AsyncStorage.removeItem('user');
      store.dispatch(logout());
    } catch (error) {
      throw new Error('Cannot logout');
    }
  };
}
