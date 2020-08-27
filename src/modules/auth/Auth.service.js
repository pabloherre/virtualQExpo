import store from '../../setup/store';
import { login, logout } from './Auth.actions';
import AsyncStorage from '@react-native-community/async-storage';

export default class AuthService {
  static login = () => {
    store.dispatch(login());
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
