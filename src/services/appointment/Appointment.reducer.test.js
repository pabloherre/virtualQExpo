import appointmentReducer from './Appointment.reducer';
import { APPOINTMENT_ADD_SUCCESS, APPOINTMENT_FIND_FAILED, APPOINTMENT_FIND_PENDING, APPOINTMENT_FIND_SUCCESS } from './Appointment.actions';

describe('Appointment Reducer', () => {
  it('should should return initial state', async () => {
    const INITIAL_STATE = {
      data: null,
      error: null,
      loading: false
    };

    expect(appointmentReducer(undefined, {})).toMatchSnapshot();
  });

  it('should handle APPOINTMENT_FIND_PENDING action', async () => {
    const INITIAL_STATE = {
      data: null,
      error: null,
      loading: true
    };

    expect(appointmentReducer(INITIAL_STATE, { type: APPOINTMENT_FIND_PENDING })).toMatchSnapshot();
  });

  it('should handle APPOINTMENT_FIND_SUCCESS action', async () => {
    const data = {
      name: 'test'
    };
    const INITIAL_STATE = {
      data,
      error: null,
      loading: true
    };

    expect(appointmentReducer(INITIAL_STATE, { type: APPOINTMENT_FIND_SUCCESS, payload: data })).toMatchSnapshot();
  });

  it('should handle APPOINTMENT_FIND_SUCCESS action', async () => {
    const INITIAL_STATE = {
      loading: false
    };

    expect(appointmentReducer(INITIAL_STATE, { type: APPOINTMENT_ADD_SUCCESS })).toMatchSnapshot();
  });

  it('should handle APPOINTMENT_FIND_FAILED action', async () => {
    const error = true;
    const INITIAL_STATE = {
      loading: false,
      data: null,
      error
    };

    expect(appointmentReducer(INITIAL_STATE, { type: APPOINTMENT_FIND_FAILED, payload: error })).toMatchSnapshot();
  });
});
