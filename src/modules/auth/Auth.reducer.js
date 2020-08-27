import { LOGOUT, LOGIN } from './Auth.actions';

const INITIAL_STATE = {
  isLoggedIn: false
};

export default function authReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGOUT:
      return Object.assign({}, state, { isLoggedIn: false });
    case LOGIN:
      return Object.assign({}, state, { isLoggedIn: true });
    default:
      return state;
  }
}
