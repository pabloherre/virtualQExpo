import React from 'react';
import { HeaderProfile } from './HeaderProfile';
import { shallow } from 'enzyme';
import AuthService from '../../modules/auth/Auth.service';
import UserService from '../../services/user/User.service';

let component;

const mockProps = {
  logout: jest.fn(),
  navigation: {
    push: jest.fn()
  }
};

describe('<HeaderProfile />', () => {
  beforeEach(() => {
    component = shallow(<HeaderProfile {...mockProps} />);
  });
  afterEach(() => {
    mockProps.navigation.push.mockClear();
    AuthService.logout.mockClear();
  });
  // it('renders correctly', async () => {
  //   expect(component).toMatchSnapshot();
  // });

  it('should have an icon', async () => {
    expect(component.find('Icon')).toExist();
  });

  it('can receive a color for the icon and should render it', async () => {
    component.setProps({ colors: { text: 'red' } });

    expect(component.instance().props.colors.text).toBe('red');
    expect(component).toMatchSnapshot();
  });

  it('should render a default color if none passed', async () => {
    expect(component.instance().props.colors.text).toBe('#a1a2a4');
    expect(component).toMatchSnapshot();
  });

  it('it calls to logout when press button', async () => {
    await component.props().onPress();
    expect(AuthService.logout).toHaveBeenCalled();
    expect(UserService.setUser).toHaveBeenCalled();
  });
});
