import React, { useEffect, useState } from "react";
import { Menu, message } from "antd";
import {
  DashboardOutlined,
  AppstoreOutlined,
  UserOutlined,
  SettingOutlined,
  DollarOutlined,
  FolderOpenOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import "../assests/css/sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../storage/user";
import { getAllModule } from "../redux/module/module.action";
import Loader from "./Loader";
import _ from "lodash";
import { usePrevious } from "../utils/custom_validation";

const Sidebar = ({ isOpen }) => {
  const location = useLocation();
  const selectedKey = location.pathname;
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

  // Define icon mapping for different routes
  const iconMapping = {
    "/dashboard": <DashboardOutlined />,
    "/manage-module": <AppstoreOutlined />,
    "/manage-role": <SettingOutlined />,
    "/manage-user": <UserOutlined />,
    "/manage-category": <FolderOpenOutlined />,
    "/manage-expense": <DollarOutlined />,
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <Menu mode="inline" theme="dark" selectedKeys={[selectedKey]}>
        {/* Static menu item for Dashboard */}
        {/* <Menu.Item
          key={DASHBOARD_APP_URL}
          icon={iconMapping[DASHBOARD_APP_URL]}
        >
          <Link to={DASHBOARD_APP_URL}>Dashboard</Link>
        </Menu.Item> */}

        {/* Dynamic menu items based on module permissions */}
        {moduleListData.map((module) => (
          <Menu.Item
            key={module.link_name}
            icon={iconMapping[module.link_name]}
          >
            <Link to={module.link_name}>{module.name}</Link>
          </Menu.Item>
        ))}
      </Menu>
      {loader && <Loader />}
    </div>
  );
};

export default Sidebar;
