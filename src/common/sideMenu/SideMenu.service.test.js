import store from '../../setup/store';
import { SideMenuService } from './SideMenu.service';

jest.unmock('./SideMenu.service');

describe('SideMenuService', () => {
  const dispatchSpy = jest.spyOn(store, 'dispatch');
  beforeEach(() => {
    dispatchSpy.mockClear();
  });

  it('should dispatch open menu', async () => {
    await SideMenuService.openMenu();
    expect(dispatchSpy).toHaveBeenCalledWith({ type: 'OPEN_MENU' });
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
  });

  it('should dispatch close menu', async () => {
    await SideMenuService.closeMenu();
    expect(dispatchSpy).toHaveBeenCalledWith({ type: 'CLOSE_MENU' });
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
  });
});
