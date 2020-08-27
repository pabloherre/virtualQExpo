import { logout, setUser } from './Auth.actions';

describe('Auth actions', () => {
  it('should create an action to logout', () => {
    expect(logout()).toMatchSnapshot();
  });
});
