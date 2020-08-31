import React from 'react';
import { LoginView } from './LoginView';
import { mount, shallow } from 'enzyme';
import AuthService from '../../modules/auth/Auth.service';
import UserService from '../../services/user/User.service';

const mockProps = {
  setUser: jest.fn(),
  navigation: {
    navigate: jest.fn()
  }
};

describe('<LoginView />', () => {
  afterEach(() => {
    mockProps.navigation.navigate.mockClear();
    AuthService.login.mockClear();
    UserService.setUser.mockClear();
    AuthService.reAuthenticate.mockClear();
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
    const user = { name: 'test' };
    const credentials = { email: 'test@email.com', password: '123456', strategy: 'local' };
    AuthService.login.mockReturnValueOnce(user);

    const wrapper = shallow(<LoginView {...mockProps} />);
    wrapper.setState(credentials);
    await wrapper.instance().handleLogin();

    expect(AuthService.login).toHaveBeenCalledWith(credentials);
    expect(UserService.setUser).toHaveBeenCalledWith(user);
    expect(wrapper.instance().props.navigation.navigate).toHaveBeenCalledWith('Appointments');
  });

  it('should call authentication service login and not redirect if error', async () => {
    AuthService.login.mockImplementation(() => {
      throw new Error('Invalid credentials');
    });

    const wrapper = shallow(<LoginView {...mockProps} />);
    try {
      await wrapper.instance().handleLogin();
    } catch (e) {
      expect(e.message).toBe('Invalid credentials');
    }
    expect(AuthService.login).toThrow();
    expect(UserService.setUser).toHaveBeenCalledTimes(0);
    expect(wrapper.instance().props.navigation.navigate).toHaveBeenCalledTimes(0);
  });

  it('should do nothing if reauthenticate fails', async () => {
    AuthService.reAuthenticate.mockReturnValue(null);

    const wrapper = await shallow(<LoginView {...mockProps} />);

    expect(UserService.setUser).toHaveBeenCalledTimes(0);
    expect(wrapper.instance().props.navigation.navigate).toHaveBeenCalledTimes(0);
  });

  it('should reauthenticate if token is present', async () => {
    const user = { name: 'pepe' };
    AuthService.reAuthenticate.mockReturnValue(user);

    const wrapper = await shallow(<LoginView {...mockProps} />);

    expect(UserService.setUser).toHaveBeenCalledWith(user);
    expect(wrapper.instance().props.navigation.navigate).toHaveBeenCalledWith('Appointments');
  });
});
