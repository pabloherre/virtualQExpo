import React from 'react';
import { connectedRender, connectedShallow, connectedMount } from '../../../jest/test-utils';
import { appointment } from '../../../jest/mocks';
import AppointmentDetailsView from './AppointmentDetailsView';

describe('<AppointmentDetailsView />', () => {
  it('has 1 child', async () => {
    const haveChildren = connectedRender(<AppointmentDetailsView appointment={appointment} />, {}).toJSON();
    expect(haveChildren.children.length).toBe(1);
  });

  it('should have 4 detail sections', async () => {
    const wrapper = connectedMount(<AppointmentDetailsView appointment={appointment} />);
    const container = wrapper.find('#appointmentDetailContainer').hostNodes();

    expect(container.children().length).toBe(4);
  });

  it('should have a detail card component', async () => {
    const wrapper = connectedMount(<AppointmentDetailsView appointment={appointment} />);
    const detailCard = wrapper.find('AppointmentCard');

    expect(detailCard).toExist();
  });

  it('should have a detail map component', async () => {
    const wrapper = connectedMount(<AppointmentDetailsView appointment={appointment} />);
    const detailCard = wrapper.find('MapView');

    expect(detailCard).toExist();
  });
});
