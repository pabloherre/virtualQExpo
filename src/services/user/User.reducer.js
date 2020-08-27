import { REGISTER_USER_PENDING, REGISTER_USER_SUCCESS, REGISTER_USER_FAILED, SET_USER } from './User.actions';

const initialState = {
  data: null,
  error: null,
  loading: false
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER_PENDING:
      return Object.assign({}, state, { loading: true, data: null });
      break;
    case REGISTER_USER_SUCCESS:
      return Object.assign({}, state, { loading: false, data: action.payload });
      break;
    case REGISTER_USER_FAILED:
      return Object.assign({}, state, { loading: false, data: null, error: action.payload });
      break;
    case SET_USER:
      return Object.assign({}, state, { data: action.payload });
      break;

    default:
      return state;
  }
};

export default userReducer;
