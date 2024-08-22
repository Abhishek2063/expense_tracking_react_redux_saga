
import { combineReducers } from 'redux';
import { signupReducer } from '../redux/signup/signup.reducer';
import { loginReducer } from '../redux/signin/signin.reducer';
export const appReducer = combineReducers({
  signup: signupReducer,
  login: loginReducer,


});
export const rootReducer = (state, action) => {
  if (action.type === "USER_LOGOUT") {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};
