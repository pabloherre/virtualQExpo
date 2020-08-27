import React from 'react';
import { shallow, mount } from 'enzyme';
import checkAuthentication from './CheckAuthentication';
import { connectedShallow, connectedMount } from '../../../../jest/test-utils';
import DummyComponent from '../../../../jest/mocks/DummyComponent';
import AsyncStorage from '@react-native-community/async-storage';

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
    AsyncStorage.getItem.mockClear();
  });

  it('should show loading when its not logged in', async () => {
    const wrapper = connectedShallow(<CheckAuthenticationComponent />, { auth: { isLoggedIn: false } });
    expect(wrapper.html()).toBe('<Text>Loading...</Text>');
  });

  it('should render wrapped component if user is logged in', async () => {
    const wrapper = connectedShallow(<CheckAuthenticationComponent />, { auth: { isLoggedIn: true } });

    expect(wrapper.html()).toBe('<View></View>');
  });

  it('should search for user in Async storage if user is not logged in', async () => {
    AsyncStorage.getItem.mockReturnValueOnce(null);
    const mounted = await connectedMount(<CheckAuthenticationComponent {...mockProps} />, { auth: { isLoggedIn: false } });
    expect(mounted.childAt(0).childAt(0).prop('isLoggedIn')).toBe(false);
    expect(AsyncStorage.getItem).toHaveBeenCalled();
    expect(mounted.childAt(0).childAt(0).instance().props.navigation.navigate).toHaveBeenCalled();
  });
});
