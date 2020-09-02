import { closeMenu, openMenu } from './SideMenu.actions';

describe('SideMenu actions', () => {
  it('should create an action to open menu', () => {
    expect(openMenu()).toMatchSnapshot();
  });

  it('should create an action to close menu', () => {
    expect(closeMenu()).toMatchSnapshot();
  });
});
