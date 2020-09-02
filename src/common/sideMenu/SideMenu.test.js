import React from 'react';
import { Menu } from './SideMenu';
import { SideMenuService } from './SideMenu.service';
import UserService from '../../services/user/User.service';
import AuthService from '../../modules/auth/Auth.service';
import { shallow } from 'enzyme';

const mockProps = {
  navigation: {
    navigate: jest.fn()
  },
  user: {
    email: 'test@email'
  }
};

describe('<Menu />', () => {
  afterAll(() => {
    SideMenuService.closeMenu.mockClear();
    UserService.setUser.mockClear();
    AuthService.logout.mockClear();
    mockProps.navigation.navigate.mockClear();
  });

  it('renders correctly', async () => {
    const button = shallow(<Menu />);
    expect(button).toMatchSnapshot();
  });

  it('should logout on press button', async () => {
    const wrapper = shallow(<Menu {...mockProps} />);

    await wrapper.find("[testID='testTouchableLogout']").first().props().onPress();

    expect(SideMenuService.closeMenu).toHaveBeenCalled();
    expect(UserService.setUser).toHaveBeenCalled();
    expect(AuthService.logout).toHaveBeenCalled();
    expect(mockProps.navigation.navigate).toHaveBeenCalled();
  });
});
