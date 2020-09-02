import React from 'react';
import SideMenu from './SideMenu';
import { connectedMount, connectedRender } from '../../../jest/test-utils';
import { SideMenuService } from './SideMenu.service';
import UserService from '../../services/user/User.service';
import AuthService from '../../modules/auth/Auth.service';

const initialState = {
  user: {
    data: {
      email: 'test@email'
    }
  }
};

const mockProps = {
  navigation: {
    navigate: jest.fn()
  }
};

describe('<SideMenu />', () => {
  afterAll(() => {
    SideMenuService.closeMenu.mockClear();
    UserService.setUser.mockClear();
    AuthService.logout.mockClear();
    mockProps.navigation.navigate.mockClear();
  });

  it('renders correctly', async () => {
    const button = connectedRender(<SideMenu />, initialState).toJSON();
    expect(button).toMatchSnapshot();
  });

  it('should logout on press button', async () => {
    const wrapper = connectedMount(<SideMenu {...mockProps} />, initialState);

    await wrapper.find("[testID='testButtonLogout']").first().props().onPress();

    expect(SideMenuService.closeMenu).toHaveBeenCalled();
    expect(UserService.setUser).toHaveBeenCalled();
    expect(AuthService.logout).toHaveBeenCalled();
    expect(mockProps.navigation.navigate).toHaveBeenCalled();
  });
});
