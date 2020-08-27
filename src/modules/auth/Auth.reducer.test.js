import authReducer from './Auth.reducer';
import { LOGOUT, SET_USER } from './Auth.actions';

describe('Auth Reducer', () => {
  it('should should return initial state', async () => {
    const INITIAL_STATE = {
      isLoggedIn: false,
      loggedUser: null
    };

    expect(authReducer(undefined, {})).toMatchSnapshot();
  });

  it('should handle LOGOUT action', async () => {
    const INITIAL_STATE = {
      isLoggedIn: true,
      loggedUser: { name: 'pepe' }
    };

    expect(authReducer(INITIAL_STATE, { type: LOGOUT })).toMatchSnapshot();
  });
});
