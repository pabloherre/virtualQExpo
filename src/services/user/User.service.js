import { userApi } from '../../setup/feathersClient';
import store from '../../setup/store';
import { registerUser, registerUserFailed, registerUserSuccess, setUser } from './User.actions';
import { showMessage } from 'react-native-flash-message';

class UserService {
  static async registerUser(user) {
    store.dispatch(registerUser());
    try {
      console.log(user);
      let result = await userApi.create(user);
      store.dispatch(registerUserSuccess(result));
      return result;
    } catch (error) {
      console.log(error);
      store.dispatch(registerUserFailed(error));
      showMessage({
        message: 'Something went wrong',
        description: error.message,
        type: 'danger',
        icon: 'danger'
      });
    }
  }

  static setUser(user) {
    store.dispatch(setUser(user));
  }
}

export default UserService;
