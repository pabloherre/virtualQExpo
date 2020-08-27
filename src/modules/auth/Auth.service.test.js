import AuthService from './Auth.service';
import { authenticate } from '../../setup/feathersClient';
import AsyncStorage from '@react-native-community/async-storage';
import store from '../../setup/store';

describe('AuthService', () => {
  it('should dispatch login action with token', async () => {
    AuthService.login();
    expect(true).toBeTruthy();
    expect(store.dispatch).toHaveBeenCalledWith({type: 'LOGIN'});
  });

  it('should save credentials', async () => {
    const credentials = { accessToken: '123' };
    authenticate.create.mockReturnValueOnce(credentials);
    AuthService.login();
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(JSON.stringify(credentials));
  });

  it.todo('should reauthenticate if the token is present');
  it.todo('should remove all credentials');
});
