import React from 'react';
import { mount, shallow } from 'enzyme';

import { AppointmentsView } from './AppointmentsView';
import { appointments } from '../../../jest/mocks';
import { connectedShallow, connectedMount } from '../../../jest/test-utils';

const mockProps = {
  appointments,
  navigation: {
    navigate: jest.fn()
  }
};

describe('<AppointmentsView />', () => {
  afterEach(() => {
    mockProps.navigation.navigate.mockClear();
  });
  it('should render correctly', async () => {
    const wrapper = shallow(<AppointmentsView />);

    expect(wrapper).toMatchSnapshot();
  });
  it('should pass the appointments to the flatList component', async () => {
    const wrapper = shallow(<AppointmentsView {...mockProps} />);

    expect(wrapper.find('FlatList').shallow().instance().props.data.length).toBe(5);
  });

  it('should redirect with the appointment when Appointment Card callback is called', async () => {
    const wrapper = shallow(<AppointmentsView {...mockProps} />);

    wrapper.instance().handleOnPressCard();

    expect(wrapper.instance().props.navigation.navigate).toHaveBeenCalled();
  });

  it('should have an add button that redirects you when pressed', async () => {
    const wrapper = shallow(<AppointmentsView {...mockProps} />);

    wrapper.find('RoundedIcon').childAt(0).props().onPress();

    expect(wrapper.instance().props.navigation.navigate).toHaveBeenCalled();
  });
});
