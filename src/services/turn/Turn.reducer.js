import { TURN_FIND_FAIL, TURN_FIND_PENDING, TURN_FIND_SUCCESS } from './Turn.actions';

const initialState = {
  data: [],
  loading: false,
  error: null
};

const turnReducer = (state = initialState, action) => {
  switch (action.type) {
    case TURN_FIND_PENDING:
      return Object.assign({}, state, { loading: true });
    case TURN_FIND_SUCCESS:
      return Object.assign({}, state, { loading: false, data: action.payload });
    case TURN_FIND_FAIL:
      return Object.assign({}, state, { loading: false, error: action.payload });
    default:
      return state;
  }
};

export default turnReducer;
