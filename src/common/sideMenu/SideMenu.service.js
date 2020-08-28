import store from '../../setup/store';
import { closeMenu, openMenu } from './SideMenu.actions';

export class SideMenuService {
  static openMenu() {
    store.dispatch(openMenu());
  }

  static closeMenu() {
    store.dispatch(closeMenu());
  }
}
