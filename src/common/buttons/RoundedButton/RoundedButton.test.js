import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import RoundedButton from './RoundedButton';

describe('<RoundedButton />', () => {
  it('renders correctly', async () => {
    const button = renderer.create(<RoundedButton label="test" />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it('can press button', async () => {
    const onPress = jest.fn();
    const button = shallow(<RoundedButton label="test" onPress={onPress} />);
    button.dive().simulate('press');
    expect(onPress).toHaveBeenCalled();
  });

  it('renders the passed label', async () => {
    const button = shallow(<RoundedButton label="test" />);
    const text = button.childAt(0);
    expect(text.contains('test')).toBe(true);
  });
});
