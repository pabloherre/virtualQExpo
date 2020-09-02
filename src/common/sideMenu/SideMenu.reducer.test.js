import sideMenuReducer from './SideMenu.reducer';
import { CLOSE_MENU, OPEN_MENU } from './SideMenu.actions';

describe('SideMenu Reducer', () => {
  it('should should return initial state', async () => {
    const INITIAL_STATE = {
      open: false
    };

    expect(sideMenuReducer(undefined, {})).toMatchSnapshot();
  });

  it('should handle OPEN MENU action', async () => {
    const INITIAL_STATE = {
      open: true
    };

    expect(sideMenuReducer(INITIAL_STATE, { type: OPEN_MENU })).toMatchSnapshot();
  });

  it('should handle CLOSE MENU action', async () => {
    const INITIAL_STATE = {
      open: false
    };

    expect(sideMenuReducer(INITIAL_STATE, { type: CLOSE_MENU })).toMatchSnapshot();
  });
});
