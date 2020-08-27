import React from 'react';
import { LoginView } from './LoginView';
import { shallow, mount } from 'enzyme';
import AuthService from '../../modules/auth/Auth.service';
import AsyncStorage from '@react-native-community/async-storage';

const mockProps = {
  setUser: jest.fn(),
  navigation: {
    navigate: jest.fn()
  }
};

describe('<LoginView />', () => {
  beforeEach(() => {
    mockProps.navigation.navigate.mockClear();
    AuthService.login.mockClear();
  });

  it('should render correctly', async () => {
    const wrapper = mount(<LoginView />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should update email state when user types in', async () => {
    const wrapper = shallow(<LoginView />);
    wrapper.find('TextInput[label="Email"]').props().onChangeText('testEmail');
    expect(wrapper.state('email')).toBe('testEmail');
  });

  it('should update password state when user types in', async () => {
    const wrapper = shallow(<LoginView />);
    wrapper.find('TextInput[label="Password"]').props().onChangeText('testPassword');
    expect(wrapper.state('password')).toBe('testPassword');
  });

  it('should call authentication service login and redirect if success', async () => {
    AuthService.login.mockReturnValueOnce(true);

    const wrapper = shallow(<LoginView {...mockProps} />);
    await wrapper.instance().handleLogin();

    expect(AuthService.login).toHaveBeenCalled();
    expect(wrapper.instance().props.navigation.navigate).toHaveBeenCalled();
  });

  it('should call authentication service login and not redirect if error', async () => {
    AuthService.login.mockImplementation(() => {
      throw new Error();
    });

    const wrapper = shallow(<LoginView {...mockProps} />);
    await wrapper.instance().handleLogin();

    expect(AuthService.login).toThrow();
    expect(wrapper.instance().props.navigation.navigate).toHaveBeenCalledTimes(0);
  });
});
