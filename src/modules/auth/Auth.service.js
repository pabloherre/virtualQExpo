import store from '../../setup/store';
import { login, logout } from './Auth.actions';
import AsyncStorage from '@react-native-community/async-storage';
import { authenticate } from '../../setup/feathersClient';

export default class AuthService {
  static login = async () => {
    try {
      await authenticate.create();
      store.dispatch(login());
      return true;
    } catch (e) {
      throw e;
    }
  };

  static logout = () => {
    store.dispatch(logout());
    try {
      AsyncStorage.removeItem('user');
    } catch (error) {
      console.log(error);
    }
  };
}
