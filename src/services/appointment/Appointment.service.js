import { appointmentApi } from '../../setup/feathersClient';
import { findAppointments, findAppointmentsFailed, findAppointmentsSuccess } from './Appointment.actions';
import { showMessage } from 'react-native-flash-message';
import store from '../../setup/store';

export default class AppointmentService {
  static async findAppointments() {
    try {
      store.dispatch(findAppointments());
      const result = await appointmentApi.find({
        query: {
          $populate: {
            path: 'turn',
            populate: {
              path: 'business'
            }
          }
        }
      });
      store.dispatch(findAppointmentsSuccess(result.data));
    } catch (e) {
      store.dispatch(findAppointmentsFailed());
      showMessage({
        message: 'Something went wrong',
        description: e.message,
        type: 'danger',
        icon: 'danger'
      });
    }
  }
}
