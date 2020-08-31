export const APPOINTMENT_FIND_PENDING = 'APPOINTMENT_FIND_PENDING';
export const APPOINTMENT_FIND_SUCCESS = 'APPOINTMENT_FIND_SUCCESS';
export const APPOINTMENT_FIND_FAILED = 'APPOINTMENT_FIND_FAILED';

export function findAppointments() {
  return {
    type: APPOINTMENT_FIND_PENDING
  };
}
export function findAppointmentsSuccess(appointment) {
  return {
    type: APPOINTMENT_FIND_SUCCESS,
    payload: appointment
  };
}
export function findAppointmentsFailed(error) {
  return {
    type: APPOINTMENT_FIND_FAILED
  };
}
