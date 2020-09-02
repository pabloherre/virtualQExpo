import { addAppointment, findAppointments, findAppointmentsFailed, findAppointmentsSuccess } from './Appointment.actions';

describe('SideMenu actions', () => {
  it('should create an action to find appointments', () => {
    expect(findAppointments()).toMatchSnapshot();
  });

  it('should create an action to find appointments with success', () => {
    expect(findAppointmentsSuccess({ name: 'test' })).toMatchSnapshot();
  });

  it('should create an action to find appointments with fail', () => {
    expect(findAppointmentsFailed({ name: 'test' })).toMatchSnapshot();
  });

  it('should create an action to add an appointment event', () => {
    expect(addAppointment({ name: 'test' })).toMatchSnapshot();
  });
});
