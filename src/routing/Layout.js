import { Outlet, Navigate } from "react-router-dom";
import Header from "../compoenents/Header";
import Footer from "../compoenents/Footer";
import { isLoggedIn } from "./authServices";
import { DASHBOARD_APP_URL, LOGIN_APP_URL } from "../utils/app_route_list";

export const Template = ({ children }) => {
  return (
    <>
      <Header />
      <div className="body-content">{children}</div>

      <Footer />
    </>
  );
};

export const LoginRouteHandler = () => {
  const userLoggedIn = isLoggedIn();

  if (!userLoggedIn) {
    return <Navigate to={LOGIN_APP_URL} replace={true} />;
  } else {
    return <Navigate to={DASHBOARD_APP_URL} replace={true} />;
  }
};

export const PublicRouteHandler = () => {
  const userLoggedIn = isLoggedIn();

  if (!userLoggedIn) {
    return <Outlet />;
  } else {
    return <Navigate to={DASHBOARD_APP_URL} replace={true} />;
  }
};

const PrivateRouteHandler = () => {
  const userLoggedIn = isLoggedIn();

  if (userLoggedIn) {
    return <Outlet />;
  } else {
    return <Navigate to={LOGIN_APP_URL} replace={true} />;
  }
};

export default PrivateRouteHandler;
