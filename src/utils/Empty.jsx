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
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../storage/user";
import { useEffect, useState } from "react";
import { getAllModule } from "../redux/module/module.action";
import Loader from "../compoenents/Loader";
import { usePrevious } from "./custom_validation";
import _ from "lodash";
import { message } from "antd";

const Empty = () => {
  const location = useLocation();
  const userLoggedIn = isLoggedIn();
  const dispatch = useDispatch();
  const userData = getUserDetails();
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

  //   const path = URL.split("/");
  //   const id = path[2];
  var matches = [
    LOGIN_APP_URL,
    REGISTER_APP_URL,
    DASHBOARD_APP_URL,
    MANAGE_MODULE_APP_URL,
    MANAGE_ROLE_APP_URL,
    MANAGE_USER_APP_URL,
    MANAGE_USER_APP_URL,
  ];

  function checkLinkPermission(linkNameToCheck) {
    if (moduleListData && moduleListData.length > 0) {
      return moduleListData.some(
        (obj) =>
          obj.link_name === linkNameToCheck && obj.has_permission === true
      );
    } else {
      return ~matches.indexOf(linkNameToCheck);
    }
  }
  if (checkLinkPermission(location.pathname)) {
    return <div> {loader && <Loader />}</div>;
  } else {
    return userLoggedIn ? (
      <Navigate to={DASHBOARD_APP_URL} />
    ) : (
      <Navigate to={LOGIN_APP_URL} />
    );
  }
};
export default Empty;
