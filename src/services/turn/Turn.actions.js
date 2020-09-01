export const TURN_FIND_PENDING = 'TURN_FIND_PENDING';
export const TURN_FIND_SUCCESS = 'TURN_FIND_SUCCESS';
export const TURN_FIND_FAIL = 'TURN_FIND_FAIL';

export function findTurns() {
  return {
    type: TURN_FIND_PENDING
  };
}

export function findTurnsSuccess(business) {
  return {
    type: TURN_FIND_SUCCESS,
    payload: business
  };
}

export function findTurnsFail() {
  return {
    type: TURN_FIND_FAIL
  };
}
