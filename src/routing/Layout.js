import { Outlet, Navigate, useLocation } from "react-router-dom";
import Header from "../compoenents/Header";
import Footer from "../compoenents/Footer";
import { isLoggedIn } from "./authServices";
import { DASHBOARD_APP_URL, LOGIN_APP_URL } from "../utils/app_route_list";
import { useEffect, useState } from "react";
import "../assests/css/template.css";
import Sidebar from "../compoenents/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../storage/user";
import { getAllModule } from "../redux/module/module.action";
import { usePrevious } from "../utils/custom_validation";
import _ from "lodash";
import { message } from "antd";

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
        <main className="main-content">{children}</main>
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
  const location = useLocation();
  const dispatch = useDispatch();
  const userData = getUserDetails();
  // eslint-disable-next-line
  const [loader, setLoader] = useState(false);
  const [moduleListData, setModuleListData] = useState([]);
  const fetchAllModules = async (role_id) => {
    setLoader(true);
    dispatch(
      getAllModule({
        role_id: role_id,
      })
    );
  };
  useEffect(() => {
    if (userData) {
      fetchAllModules(userData?.role?.id);
    }
    // eslint-disable-next-line
  }, []);
  const getAllModuleData = useSelector(
    (state) => state.module.getAllModuleData
  );
  const prevGetAllModuleData = usePrevious({ getAllModuleData });

  useEffect(() => {
    if (
      prevGetAllModuleData &&
      prevGetAllModuleData.getAllModuleData !== getAllModuleData
    ) {
      if (
        getAllModuleData &&
        _.has(getAllModuleData, "data") &&
        getAllModuleData.success === true
      ) {
        message.success(getAllModuleData.message);
        // Filter the modules based on permission
        const modulesWithPermission = getAllModuleData?.data?.modules.filter(
          (module) => module.has_permission
        );
        setModuleListData(modulesWithPermission);
        setLoader(false);
      }
      if (getAllModuleData && getAllModuleData.success === false) {
        setLoader(false);
        message.error(getAllModuleData.message);
      }
    } // eslint-disable-next-line
  }, [getAllModuleData, prevGetAllModuleData]);
  function checkLinkPermission() {
    if (moduleListData && moduleListData.length > 0) {
      return moduleListData.some(
        (obj) =>
          obj.link_name === location.pathname && obj.has_permission === true
      );
    }
  }
  if (userLoggedIn) {
    if (checkLinkPermission(location.pathname)) {
      return <Outlet />;
    } else {
      return <Navigate to={DASHBOARD_APP_URL} replace={true} />;
    }
  } else {
    return <Navigate to={LOGIN_APP_URL} replace={true} />;
  }
};

export default PrivateRouteHandler;
