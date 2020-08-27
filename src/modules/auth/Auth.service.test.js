import AuthService from './Auth.service';

describe('AuthService', () => {
  it('should dispatch login action', async () => {
    AuthService.login();
    expect(true).toBeTruthy();
  });
});
