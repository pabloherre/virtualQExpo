export const REGISTER_USER_PENDING = 'REGISTER_USER_PENDING';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILED = 'REGISTER_USER_FAILED';
export const SET_USER = 'SET_USER';

export function registerUser() {
  return {
    type: REGISTER_USER_PENDING
  };
}
export function registerUserSuccess(user) {
  return {
    type: REGISTER_USER_SUCCESS,
    payload: user
  };
}
export function registerUserFailed(error) {
  return {
    type: REGISTER_USER_FAILED
  };
}
export function setUser(user) {
  return {
    type: SET_USER,
    payload: user
  };
}
