import { Navigate } from "react-router-dom";
import { LOGIN_APP_URL } from "../utils/app_route_list";
import { removeLocalData, getToken } from "../storage/tokens";
import { getUserDetails } from '../storage/user';

export const onLogout = () => {
  removeLocalData();
  <Navigate to={LOGIN_APP_URL} />
  return true;
};


export const isLoggedIn = () => {
  if (getToken() && getUserDetails()) {
    return true;
  } else {
    removeLocalData();
    return false;
  }
};
