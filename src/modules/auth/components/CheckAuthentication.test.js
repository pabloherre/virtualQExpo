import React from 'react';
import checkAuthentication from './CheckAuthentication';
import { connectedMount, connectedShallow } from '../../../../jest/test-utils';
import DummyComponent from '../../../../jest/mocks/DummyComponent';
import AuthService from '../Auth.service';
import UserService from '../../../services/user/User.service';

let CheckAuthenticationComponent;

const mockProps = {
  setUser: jest.fn(),
  navigation: {
    navigate: jest.fn()
  }
};

describe('withLoading should render', () => {
  beforeEach(() => {
    CheckAuthenticationComponent = checkAuthentication(DummyComponent);
  });

  afterEach(() => {
    mockProps.navigation.navigate.mockClear();
    AuthService.reAuthenticate.mockClear();
    UserService.setUser.mockClear();
  });

  it('should show loading when its not logged in', async () => {
    const wrapper = connectedShallow(<CheckAuthenticationComponent />, { auth: { isLoggedIn: false } });
    expect(wrapper.html()).toBe('');
  });

  it('should render wrapped component if user is logged in', async () => {
    const wrapper = connectedShallow(<CheckAuthenticationComponent />, { auth: { isLoggedIn: true } });

    expect(wrapper.html()).toBe('<View></View>');
  });

  it('should search for user in Async storage if user is not logged in', async () => {
    const mounted = await connectedMount(<CheckAuthenticationComponent {...mockProps} />, { auth: { isLoggedIn: false } });
    expect(mounted.childAt(0).childAt(0).prop('isLoggedIn')).toBe(false);
    expect(mounted.childAt(0).childAt(0).instance().props.navigation.navigate).toHaveBeenCalled();
  });

  it('should set user if reauthentiation was successfull', async () => {
    const user = { user: { name: 'pepe' } };
    AuthService.reAuthenticate.mockReturnValue(user);

    await connectedMount(<CheckAuthenticationComponent {...mockProps} />, { auth: { isLoggedIn: false } });
    expect(UserService.setUser).toHaveBeenCalledWith(user);
  });

  it("should redirect login if reauthentiation wasn't successful", async () => {
    AuthService.reAuthenticate.mockReturnValue(null);

    await connectedMount(<CheckAuthenticationComponent {...mockProps} />, { auth: { isLoggedIn: false } });
    expect(UserService.setUser).toHaveBeenCalledTimes(0);
    expect(mockProps.navigation.navigate).toHaveBeenCalledWith('Login');
  });
});
