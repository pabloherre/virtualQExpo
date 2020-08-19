import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import RoundedButton from './RoundedButton';

it('renders correctly', () => {
  const tree = renderer.create(<RoundedButton />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('can press button', () => {
  const onPress = jest.fn();
  const button = shallow(<RoundedButton onPress={onPress} />);
  button.dive().simulate('press');
  expect(onPress).toHaveBeenCalled();
});

it('has label', () => {
  const button = shallow(<RoundedButton label={'algo'} />);
  const text = button.childAt(0);
  expect(text.text()).toEqual();
});
