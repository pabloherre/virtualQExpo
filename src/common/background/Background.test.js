import React from 'react';
import renderer from 'react-test-renderer';
import Background from './Background';

describe('<Background />', () => {
  it('renders correctly', async () => {
    const button = renderer.create(<Background />).toJSON();
    expect(button).toMatchSnapshot();
  });
});
