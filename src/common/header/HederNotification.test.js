import React from 'react';
import renderer from 'react-test-renderer';
import HeaderNotification from './HeaderNotification';
import { connectedRender } from '../../../jest/test-utils';

describe('<HeaderNotification />', () => {
  it('renders correctly', async () => {
    const button = connectedRender(<HeaderNotification />).toJSON();
    expect(button).toMatchSnapshot();
  });
});
