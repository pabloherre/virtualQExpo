import { userApi } from '../../setup/feathersClient';
import store from '../../setup/store';
import { registerUser, registerUserSuccess, registerUserFailed, setUser } from './User.actions';

class UserService {
  static async registerUser(user) {
    store.dispatch(registerUser());
    try {
      let result = await userApi.create(user);
      store.dispatch(registerUserSuccess(result));
      return result;
    } catch (error) {
      store.dispatch(registerUserFailed(error));
    }
  }

  static async setUser(user) {
    store.dispatch(setUser(user));
  }
}

export default UserService;
