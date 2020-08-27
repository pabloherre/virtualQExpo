import { applyMiddleware, combineReducers, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import auth from '../modules/auth/Auth.reducer';
import appointment from '../modules/appointments/Appointment.reducer';
import userReducer from '../services/user/User.reducer';

const reducers = combineReducers({
  auth,
  appointment,
  user: userReducer
});

const store = createStore(reducers, applyMiddleware(ReduxThunk, logger));
window.store = store; // TODO: remove in production.

export default store;
