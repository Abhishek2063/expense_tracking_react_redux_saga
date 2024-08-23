import { Outlet, Navigate } from "react-router-dom";
import Header from "../compoenents/Header";
import Footer from "../compoenents/Footer";
import { isLoggedIn } from "./authServices";
import { DASHBOARD_APP_URL, LOGIN_APP_URL } from "../utils/app_route_list";
import { useState } from "react";
import "../assests/css/template.css"
import Sidebar from "../compoenents/Sidebar";

export const Template = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="template-container">
      <Header toggleSidebar={toggleSidebar} />
      <div className="content-wrapper">
        <Sidebar isOpen={sidebarOpen} />
        <main className="main-content">
          {children}
        </main>
      </div>
      <Footer />
    </div>
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
