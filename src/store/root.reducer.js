import { combineReducers } from "redux";
import { signupReducer } from "../redux/signup/signup.reducer";
import { loginReducer } from "../redux/signin/signin.reducer";
import { roleReducer } from "../redux/role/role.reducer";
import { moduleReducer } from "../redux/module/module.reducer";
export const appReducer = combineReducers({
  signup: signupReducer,
  login: loginReducer,
  role: roleReducer,
  module: moduleReducer
});
export const rootReducer = (state, action) => {
  if (action.type === "USER_LOGOUT") {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};
