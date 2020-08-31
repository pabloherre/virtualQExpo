import React from 'react';
import ConnectedHeaderProfile, { HeaderProfile } from './HeaderProfile';
import { shallow } from 'enzyme';
import AuthService from '../../modules/auth/Auth.service';
import { SideMenuService } from '../sideMenu/SideMenu.service';
import { connectedMount } from '../../../jest/test-utils';

let component;

const mockProps = {
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
    SideMenuService.openMenu.mockClear();
    SideMenuService.closeMenu.mockClear();
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

  it('it calls to open side menu when press button', async () => {
    const component = connectedMount(<ConnectedHeaderProfile />, { sideMenu: { open: false } });
    await component.childAt(0).childAt(0).childAt(0).childAt(0).props().onPress();
    expect(SideMenuService.openMenu).toHaveBeenCalled();
  });

  it('it calls to close side menu when press button', async () => {
    const component = connectedMount(<ConnectedHeaderProfile />, { sideMenu: { open: true } });
    await component.childAt(0).childAt(0).childAt(0).childAt(0).props().onPress();
    expect(SideMenuService.closeMenu).toHaveBeenCalled();
  });
});
