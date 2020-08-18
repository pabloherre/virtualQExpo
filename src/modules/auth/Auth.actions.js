export const SET_USER = 'SET_USER';
export const LOGOUT = 'LOGOUT';

export function setUser(user) {
  return {
    type: SET_USER,
    payload: user
  };
}

export function logout() {
  return {
    type: LOGOUT
  };
}
