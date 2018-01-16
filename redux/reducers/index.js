import { combineReducers } from 'redux';
import auth from './auth';
import menus from './menus';

const rootReducer = combineReducers({
    auth,
    menus
});

const srootReducer = (state, action) => {
  if (action.type === 'LOGOUT_REQUEST') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
