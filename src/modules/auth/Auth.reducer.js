import { LOGOUT, SET_USER } from './Auth.actions';

const INITIAL_STATE = {
  isLoggedIn: false,
  loggedUser: null
};

export default function authReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_USER:
      return Object.assign({}, state, { isLoggedIn: true, loggedUser: action.payload });
    case LOGOUT:
      return Object.assign({}, state, { isLoggedIn: false, loggedUser: null });
    default:
      return state;
  }
}
