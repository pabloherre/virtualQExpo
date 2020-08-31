import { APPOINTMENT_FIND_FAILED, APPOINTMENT_FIND_PENDING, APPOINTMENT_FIND_SUCCESS } from './Appointment.actions';

const initialState = {
  data: null,
  error: null,
  loading: false
};

const appointmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case APPOINTMENT_FIND_PENDING:
      return Object.assign({}, state, { loading: true, data: null });
    case APPOINTMENT_FIND_SUCCESS:
      return Object.assign({}, state, { loading: false, data: action.payload });
    case APPOINTMENT_FIND_FAILED:
      return Object.assign({}, state, { loading: false, data: null, error: action.payload });
    default:
      return state;
  }
};

export default appointmentReducer;
