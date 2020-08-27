export const LOGOUT = 'LOGOUT';
export const LOGIN = 'LOGIN';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGIN_PENDING = 'LOGIN_PENDING';

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

export function loginFail() {
  return {
    type: LOGIN_FAIL
  };
}

export function loginPending() {
  return {
    type: LOGIN_PENDING
  };
}
