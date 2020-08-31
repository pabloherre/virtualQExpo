import { authenticate } from '../../setup/feathersClient';
import AsyncStorage from '@react-native-community/async-storage';
import store from '../../setup/store';
import AuthService from './Auth.service';

jest.unmock('./Auth.service');

describe('AuthService', () => {
  const dispatchSpy = jest.spyOn(store, 'dispatch');
  const credentials = { email: 'test@test.com', password: '123456' };
  const result = { accessToken: '123', users: { name: 'test' } };

  beforeEach(() => {
    authenticate.create.mockClear();
    AsyncStorage.setItem.mockClear();
    dispatchSpy.mockClear();
  });

  it('should login successfully', async () => {
    authenticate.create.mockReturnValueOnce(result);

    await AuthService.login(credentials);

    expect(dispatchSpy).toHaveBeenCalledWith({ type: 'LOGIN_PENDING' });
    expect(dispatchSpy).toHaveBeenCalledWith({ type: 'LOGIN' });
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('accessToken', result.accessToken);
  });

  it('login should fail', async () => {
    authenticate.create.mockImplementation(() => {
      throw new Error('');
    });

    await AuthService.login(credentials);

    expect(dispatchSpy).toHaveBeenCalledWith({ type: 'LOGIN_FAIL' });
    expect(AsyncStorage.setItem).toHaveBeenCalledTimes(0);
  });

  it('should fail if no credentials', async () => {
    authenticate.create.mockImplementation(() => {
      throw new Error('Must provide valid credentials');
    });

    try {
      await AuthService.login();
      expect(false).toBeTruthy();
    } catch (e) {
      expect(e.message).toBe('Must provide valid credentials');
    }
    expect(authenticate.create).toHaveBeenCalledTimes(0);
  });

  it('should reauthenticate if the token is present', async () => {
    authenticate.create.mockReturnValueOnce(result);

    const user = await AuthService.reAuthenticate();

    expect(dispatchSpy).toHaveBeenCalledWith({ type: 'LOGIN' });
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('accessToken', result.accessToken);
    expect(user).toBe(result.users);
  });

  it('should fail on reauthenticate if token not present', async () => {
    authenticate.create.mockImplementation(() => {
      throw new Error('Cannot reauthenticate');
    });

    const user = await AuthService.reAuthenticate();
    expect(user).toBeNull();
    expect(dispatchSpy).toHaveBeenCalledWith({ type: 'LOGIN_FAIL' });
  });

  it('should remove all credentials', async () => {
    await AuthService.logout();
    expect(dispatchSpy).toHaveBeenCalledWith({ type: 'LOGOUT' });
    expect(AsyncStorage.removeItem).toHaveBeenCalledTimes(1);
    expect(AsyncStorage.removeItem).toHaveBeenCalledWith('user');
  });

  it('should handle error on logout', async () => {
    AsyncStorage.removeItem.mockImplementation(() => {
      throw new Error('Cannot logout');
    });

    try {
      await AuthService.logout();
    } catch (e) {
      expect(e.message).toBe('Cannot logout');
    }
    expect(dispatchSpy).toHaveBeenCalledTimes(0);
  });
});
