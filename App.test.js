import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import App from './App';

describe('<App />', () => {
  it('has 1 child', async () => {
    const wrapper = mount(<App />);
    // const tree = renderer.create(<App />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
