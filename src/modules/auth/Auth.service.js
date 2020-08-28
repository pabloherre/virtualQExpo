import store from '../../setup/store';
import { login, loginFail, loginPending, logout } from './Auth.actions';
import AsyncStorage from '@react-native-community/async-storage';
import { authenticate } from '../../setup/feathersClient';
import { showMessage } from 'react-native-flash-message';

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
      return result.users;
    } catch (e) {
      console.log(e);
      store.dispatch(loginFail());
      showMessage({
        message: 'Login Failed',
        description: e.message,
        type: 'danger',
        icon: 'danger'
      });
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
