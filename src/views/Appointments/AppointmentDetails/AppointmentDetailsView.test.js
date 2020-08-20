import React from 'react';
import { connectedRender } from '../../../../jest/test-utils';
import { appointment } from '../../../../jest/mocks';
import AppointmentDetailsView from './AppointmentDetailsView';

describe('<AppointmentDetailsView />', () => {
  it('has 1 child', async () => {
    const haveChildren = connectedRender(<AppointmentDetailsView appointment={appointment} />, {}).toJSON();
    expect(haveChildren.children.length).toBe(1);
  });
});