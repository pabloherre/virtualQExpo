import { userApi } from '../../setup/feathersClient';
import store from '../../setup/store';
jest.unmock('./User.service');

import UserService from './User.service';

describe('UserService', () => {
  const dispatchSpy = jest.spyOn(store, 'dispatch');
  beforeEach(() => {
    dispatchSpy.mockClear();
  });

  it('should dispatch pending when called if user was registered', async () => {
    //prepare
    const userData = { name: 'name' };
    userApi.create.mockReturnValueOnce(userData);
    //execute
    await UserService.registerUser();
    //assert
    // asegurar que el dispatch se disparo
    expect(dispatchSpy).toHaveBeenCalledWith({ type: 'REGISTER_USER_PENDING' });
    expect(dispatchSpy).toHaveBeenCalledWith({ type: 'REGISTER_USER_SUCCESS', payload: { name: 'name' } });
    expect(dispatchSpy).toHaveBeenCalledTimes(2);
  });

  it('should dispatch fail if user was not registered', async () => {
    userApi.create.mockImplementation(() => {
      throw new Error();
    });
    await UserService.registerUser();
    expect(dispatchSpy).toHaveBeenCalledWith({ type: 'REGISTER_USER_PENDING' });
    expect(dispatchSpy).toHaveBeenCalledWith({ type: 'REGISTER_USER_FAILED' });
    expect(dispatchSpy).toHaveBeenCalledTimes(2);
  });
});
