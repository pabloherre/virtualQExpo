import { CLOSE_MENU, OPEN_MENU } from './SideMenu.actions';

const initialState = {
  open: false
};

const sideMenuReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MENU:
      return Object.assign({}, state, { open: true });
    case CLOSE_MENU:
      return Object.assign({}, state, { open: false });
    default:
      return state;
  }
};

export default sideMenuReducer;
