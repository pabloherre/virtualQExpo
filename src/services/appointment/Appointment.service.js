import { appointmentApi } from '../../setup/feathersClient';
import { addAppointment, findAppointments, findAppointmentsFailed, findAppointmentsSuccess } from './Appointment.actions';
import { showMessage } from 'react-native-flash-message';
import store from '../../setup/store';
import AsyncStorage from '@react-native-community/async-storage';

export default class AppointmentService {
  static async findAppointments() {
    try {
      store.dispatch(findAppointments());
      const loggedUser = await AsyncStorage.getItem('user');
      const result = await appointmentApi.find({
        query: {
          user: JSON.parse(loggedUser)._id,
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

  static async createAppointment(appmnt) {
    store.dispatch(findAppointments());
    try {
      const loggedUser = await AsyncStorage.getItem('user');
      appmnt.user = JSON.parse(loggedUser)._id;
      const appointment = await appointmentApi.create(appmnt);
      store.dispatch(addAppointment());
      return appointment;
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

  static async deleteAppointment(id) {
    store.dispatch(findAppointments());
    try {
      const appointment = await appointmentApi.remove(id);
      store.dispatch(addAppointment());
      return appointment;
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
