import { combineReducers } from "redux";
import { signupReducer } from "../redux/signup/signup.reducer";
import { loginReducer } from "../redux/signin/signin.reducer";
import { roleReducer } from "../redux/role/role.reducer";
import { moduleReducer } from "../redux/module/module.reducer";
import { userReducer } from "../redux/user/user.reducer";
import { categoryReducer } from "../redux/category/category.reducer";
export const appReducer = combineReducers({
  signup: signupReducer,
  login: loginReducer,
  role: roleReducer,
  module: moduleReducer,
  user: userReducer,
  category: categoryReducer,
});
export const rootReducer = (state, action) => {
  if (action.type === "USER_LOGOUT") {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};
