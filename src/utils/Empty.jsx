import { Navigate, useLocation } from "react-router-dom";
import { isLoggedIn } from "../routing/authServices";
import {
  DASHBOARD_APP_URL,
  LOGIN_APP_URL,
  MANAGE_MODULE_APP_URL,
  MANAGE_ROLE_APP_URL,
  MANAGE_USER_APP_URL,
  REGISTER_APP_URL,
} from "./app_route_list";

const Empty = () => {
  const location = useLocation();
  const userLoggedIn = isLoggedIn();

  //   const path = URL.split("/");
  //   const id = path[2];
  var matches = [
    LOGIN_APP_URL,
    REGISTER_APP_URL,
    DASHBOARD_APP_URL,
    MANAGE_MODULE_APP_URL,
    MANAGE_ROLE_APP_URL,
    MANAGE_USER_APP_URL,
  ];

  if (~matches.indexOf(location.pathname)) {
    return <div></div>;
  } else {
    return userLoggedIn ? (
      <Navigate to={DASHBOARD_APP_URL} />
    ) : (
      <Navigate to={LOGIN_APP_URL} />
    );
  }
};
export default Empty;
