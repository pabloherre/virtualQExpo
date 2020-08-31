import { applyMiddleware, combineReducers, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import auth from '../modules/auth/Auth.reducer';
import userReducer from '../services/user/User.reducer';
import sideMenuReducer from '../common/sideMenu/SideMenu.reducer';
import appointmentReducer from '../services/appointment/Appointment.reducer';

const reducers = combineReducers({
  auth,
  appointment: appointmentReducer,
  user: userReducer,
  sideMenu: sideMenuReducer
});

const store = createStore(
  reducers,
  applyMiddleware(ReduxThunk, () => {
    return next => action => {
      console.log('action', action.type);
      return next(action);
    };
  })
);
// const store = createStore(reducers, applyMiddleware(ReduxThunk, logger));
window.store = store; // TODO: remove in production.

export default store;
