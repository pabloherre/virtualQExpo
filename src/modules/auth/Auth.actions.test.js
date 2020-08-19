import { logout, setUser } from './Auth.actions';

describe('Auth actions', () => {
  it('should create an action to logout', () => {
    expect(logout()).toMatchSnapshot();
  });

  it('should create an action to setUser', () => {
    const user = {
      name: 'test user',
      email: 'test@user.com'
    };
    expect(setUser(user)).toMatchSnapshot();
  });
});
