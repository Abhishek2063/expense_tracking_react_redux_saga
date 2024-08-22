
import { combineReducers } from 'redux';
import { signupReducer } from '../redux/signup/signup.reducer';
export const appReducer = combineReducers({
  signup: signupReducer,

});
export const rootReducer = (state, action) => {
  if (action.type === "USER_LOGOUT") {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};
