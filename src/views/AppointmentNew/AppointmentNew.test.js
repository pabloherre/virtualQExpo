import React from 'react';
import { AppointmentNew } from './AppointmentNew';
import { shallow } from 'enzyme';
import { connectedMount } from '../../../jest/test-utils';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

import { appointments } from '../../../jest/mocks';

let wrapper;
const mockProps = {
  appointments,
  navigation: {
    navigate: jest.fn()
  }
};

describe('<AppointmentNew>', () => {
  beforeEach(() => {
    wrapper = shallow(<AppointmentNew {...mockProps} />);
  });

  afterEach(() => {
    Location.requestPermissionsAsync.mockClear();
    Location.getCurrentPositionAsync.mockClear();
    mockProps.navigation.navigate.mockClear();
  });
  it('should render correctly', async () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should ask for location permission to the user and dont try to get location if permission not granted', async () => {
    Location.requestPermissionsAsync.mockReturnValueOnce({});
    //mount component again so we mock the response of Location reques
    //on componentDidMountfor this test
    wrapper = await shallow(<AppointmentNew {...mockProps} />);
    expect(Location.requestPermissionsAsync).toHaveBeenCalled();
    expect(Location.getCurrentPositionAsync).toBeCalledTimes(0);
  });

  it('should ask for location permission to the user and get location if granted', async () => {
    Location.requestPermissionsAsync.mockReturnValueOnce({ status: 'granted' });
    //mount component again so we mock the response of Location reques
    //on componentDidMountfor this test
    wrapper = await shallow(<AppointmentNew {...mockProps} />);
    expect(Location.requestPermissionsAsync).toHaveBeenCalled();
    expect(Location.getCurrentPositionAsync).toHaveBeenCalled();
  });
  it('should have an input for the appointment code', async () => {
    expect(wrapper.find('Component[label="Code"]')).toExist();
  });

  it('should have an scan button dont redurects you if permission is not granted', async () => {
    BarCodeScanner.requestPermissionsAsync.mockReturnValueOnce({});
    await wrapper.find('RoundedButton').simulate('press');
    expect(BarCodeScanner.requestPermissionsAsync).toHaveBeenCalled();
    expect(wrapper.instance().props.navigation.navigate).toBeCalledTimes(0);
  });

  it('should have an scan button that redirects you to the camera view  if permission granted', async () => {
    BarCodeScanner.requestPermissionsAsync.mockReturnValueOnce({ status: 'granted' });
    await wrapper.find('RoundedButton').simulate('press');
    expect(BarCodeScanner.requestPermissionsAsync).toHaveBeenCalled();
    expect(wrapper.instance().props.navigation.navigate).toHaveBeenCalled();
  });

  it('should update the searchValue state when writting on Code input', async () => {
    wrapper.find('Component[label="Code"]').props().onChangeText('code');
    expect(wrapper.state('searchValue')).toBe('code');
  });

  it('should redirect you to the appointment after processing the appointment', async () => {
    wrapper.find('#searchCode').simulate('press');
    expect(wrapper.instance().props.navigation.navigate).toHaveBeenCalled();
  });
});
