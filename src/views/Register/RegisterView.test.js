import React from 'react';
import { RegisterView } from './RegisterView';
import { shallow, mount } from 'enzyme';
import AsyncStorage from '@react-native-community/async-storage';
import UserService from '../../services/user/User.service';

const mockProps = {
  setUser: jest.fn(),
  navigation: {
    navigate: jest.fn()
  }
};

describe('<RegisterView />', () => {
  afterEach(() => {
    UserService.registerUser.mockClear();
    mockProps.navigation.navigate.mockClear();
  });
  it.skip('should render correctly', async () => {
    const wrapper = mount(<RegisterView />);

    expect(wrapper).toMatchSnapshot();
  });
  it('should update email state when user types in', async () => {
    const wrapper = shallow(<RegisterView />);
    wrapper.find('TextInput[label="Nombre"]').props().onChangeText('testName');
    expect(wrapper.state('firstName')).toBe('testName');
  });

  it('should update password state when user types in', async () => {
    const wrapper = shallow(<RegisterView />);
    wrapper.find('TextInput[label="Apellido"]').props().onChangeText('testLastName');
    expect(wrapper.state('lastName')).toBe('testLastName');
  });
  it('should update email state when user types in', async () => {
    const wrapper = shallow(<RegisterView />);
    wrapper.find('TextInput[label="Email"]').props().onChangeText('testEmail');
    expect(wrapper.state('email')).toBe('testEmail');
  });

  it('should update password state when user types in', async () => {
    const wrapper = shallow(<RegisterView />);
    wrapper.find('TextInput[label="Password"]').props().onChangeText('testPassword');
    expect(wrapper.state('password')).toBe('testPassword');
  });

  it('should set user in async storage when register', async () => {
    UserService.registerUser.mockReturnValueOnce({ name: 'test' });
    const wrapper = shallow(<RegisterView {...mockProps} />);

    await wrapper.instance().handleRegister();

    expect(AsyncStorage.setItem).toHaveBeenCalled();
    expect(wrapper.instance().props.navigation.navigate).toHaveBeenCalled();
  });

  it('should not redirect if register failed', async () => {
    UserService.registerUser.mockReturnValueOnce(false);
    const wrapper = shallow(<RegisterView {...mockProps} />);

    await wrapper.instance().handleRegister();

    expect(wrapper.instance().props.navigation.navigate).toHaveBeenCalledTimes(0);
  });
});
