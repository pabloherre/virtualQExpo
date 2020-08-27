import React from 'react';
import { RegisterView } from './RegisterView';
import { shallow, mount } from 'enzyme';
import AsyncStorage from '@react-native-community/async-storage';

const mockProps = {
  setUser: jest.fn(),
  navigation: {
    navigate: jest.fn()
  }
};

describe('<RegisterView />', () => {
  it('should render correctly', async () => {
    const wrapper = mount(<RegisterView />);

    expect(wrapper).toMatchSnapshot();
  });
  it('should update email state when user types in', async () => {
    const wrapper = shallow(<RegisterView />);
    wrapper.find('TextInput[label="Nombre"]').props().onChangeText('testName');
    expect(wrapper.state('name')).toBe('testName');
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
    const wrapper = shallow(<RegisterView {...mockProps} />);

    await wrapper.instance().handleRegister();

    expect(AsyncStorage.setItem).toHaveBeenCalled();
    expect(wrapper.instance().props.setUser).toHaveBeenCalled();
    expect(wrapper.instance().props.navigation.navigate).toHaveBeenCalled();
  });
});
