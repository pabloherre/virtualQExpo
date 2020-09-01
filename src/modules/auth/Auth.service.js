import store from '../../setup/store';
import { login, loginFail, loginPending, logout } from './Auth.actions';
import AsyncStorage from '@react-native-community/async-storage';
import { authenticate, reAuthenticate } from '../../setup/feathersClient';
import { showMessage } from 'react-native-flash-message';

export default class AuthService {
  static login = async credentials => {
    credentials = { strategy: 'local', ...credentials };
    if (!credentials.email || !credentials.password) {
      throw new Error('Must provide valid credentials');
    }

    try {
      store.dispatch(loginPending());
      const result = await authenticate(credentials);
      store.dispatch(login());
      await AsyncStorage.setItem('accessToken', result.accessToken);
      return result.users;
    } catch (e) {
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

  static reAuthenticate = async () => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    console.log(accessToken);
    if (accessToken) {
      try {
        store.dispatch(loginPending());
        const result = await reAuthenticate();
        store.dispatch(login());
        await AsyncStorage.setItem('accessToken', result.accessToken);
        return result.users;
      } catch (e) {
        console.log(e);
        store.dispatch(loginFail());
      }
    }
    return null;
  };
}
