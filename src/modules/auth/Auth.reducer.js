import { LOGIN, LOGIN_FAIL, LOGIN_PENDING, LOGOUT } from './Auth.actions';

const INITIAL_STATE = {
  isLoggedIn: false,
  error: null,
  loading: false
};

export default function authReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGOUT:
      return Object.assign({}, state, { isLoggedIn: false, error: null });
    case LOGIN:
      return Object.assign({}, state, { isLoggedIn: true, error: null, loading: false });
    case LOGIN_FAIL:
      return Object.assign({}, state, { isLoggedIn: false, error: action.payload, loading: false });
    case LOGIN_PENDING:
      return Object.assign({}, state, { loading: true });
    default:
      return state;
  }
}
