import React from 'react';
import { LoginView } from './LoginView';
import { shallow, mount } from 'enzyme';
import AsyncStorage from '@react-native-community/async-storage';

const mockProps = {
  setUser: jest.fn(),
  navigation: {
    navigate: jest.fn()
  }
};

describe('<LoginView />', () => {
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

  it('should set user in async storage when log in', async () => {
    const wrapper = shallow(<LoginView {...mockProps} />);
    await wrapper.instance().handleLogin();

    expect(AsyncStorage.setItem).toHaveBeenCalled();
    expect(wrapper.instance().props.setUser).toHaveBeenCalled();
    expect(wrapper.instance().props.navigation.navigate).toHaveBeenCalled();
  });
});
