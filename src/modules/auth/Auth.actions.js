export const LOGOUT = 'LOGOUT';
export const LOGIN = 'LOGIN';

export function logout() {
  return {
    type: LOGOUT
  };
}

export function login() {
  return {
    type: LOGIN
  };
}
