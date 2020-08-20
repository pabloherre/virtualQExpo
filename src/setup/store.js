import { applyMiddleware, combineReducers, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import auth from '../modules/auth/Auth.reducer';
import appointment from '../modules/appointments/Appointment.reducer';

const reducers = combineReducers({
  auth,
  appointment
});

const store = createStore(reducers, applyMiddleware(ReduxThunk));
window.store = store; // TODO: remove in production.

export default store;
