import React from 'react';
import { connectedMount, connectedRender } from '../../../jest/test-utils';
import { appointment } from '../../../jest/mocks';
import AppointmentDetailsView from './AppointmentDetailsView';

describe('<AppointmentDetailsView />', () => {
  it('has 1 child', async () => {
    const haveChildren = connectedRender(
      <AppointmentDetailsView
        route={{
          params: {
            appointment: appointment
          }
        }}
      />,
      {
        appointment: {
          loading: false
        }
      }
    ).toJSON();
    expect(haveChildren.children.length).toBe(2);
  });

  it('should have a detail card component', async () => {
    const wrapper = connectedMount(
      <AppointmentDetailsView
        route={{
          params: {
            appointment: appointment
          }
        }}
      />,
      {
        appointment: {
          loading: false
        }
      }
    );
    const detailCard = wrapper.find('AppointmentCard');

    expect(detailCard).toExist();
  });

  it('should have a detail map component', async () => {
    const wrapper = connectedMount(
      <AppointmentDetailsView
        route={{
          params: {
            appointment: appointment
          }
        }}
      />,
      {
        appointment: {
          loading: false
        }
      }
    );
    const detailCard = wrapper.find('MapView');

    expect(detailCard).toExist();
  });
});
