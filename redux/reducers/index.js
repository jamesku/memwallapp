import { combineReducers } from 'redux';
import auth from './auth';

const rootReducer = combineReducers({
    auth
});

const srootReducer = (state, action) => {
  if (action.type === 'LOGOUT_REQUEST') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
