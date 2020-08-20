import { appointments } from '../../../jest/mocks';

const INITIAL_STATE = {
  appointments
};

export default function appointmentReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    default:
      return state;
  }
}
