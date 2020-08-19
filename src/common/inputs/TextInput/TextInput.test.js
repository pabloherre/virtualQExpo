import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import TextInput from './TextInput';

describe('<TextInput />', () => {
  it('should render correctly', async () => {
    const textInput = renderer.create(<TextInput label="Test" />);

    expect(textInput).toMatchSnapshot();
  });

  it('should render the passed label', async () => {
    const wrapper = shallow(<TextInput label="Test" />);
    const label = wrapper.childAt(0);
    expect(label.contains('Test')).toBe(true);
  });

  it.todo('should validate email format if type="email"');
});
