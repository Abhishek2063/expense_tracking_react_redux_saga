import React from "react";
import { Menu } from "antd";
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
import {
  DASHBOARD_APP_URL,
  MANAGE_CATEGORY_APP_URL,
  MANAGE_EXPESENS_APP_URL,
  MANAGE_MODULE_APP_URL,
  MANAGE_ROLE_APP_URL,
  MANAGE_USER_APP_URL,
} from "../utils/app_route_list";

const Sidebar = ({ isOpen }) => {
  const location = useLocation();
  const selectedKey = location.pathname;

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <Menu mode="inline" theme="dark" selectedKeys={[selectedKey]}>
        <Menu.Item key={DASHBOARD_APP_URL} icon={<DashboardOutlined />}>
          <Link to={DASHBOARD_APP_URL}>Dashboard</Link>
        </Menu.Item>
        <Menu.Item key={MANAGE_MODULE_APP_URL} icon={<AppstoreOutlined />}>
          <Link to={MANAGE_MODULE_APP_URL}>Manage Modules</Link>
        </Menu.Item>
        <Menu.Item key={MANAGE_ROLE_APP_URL} icon={<SettingOutlined />}>
          <Link to={MANAGE_ROLE_APP_URL}>Manage Roles</Link>
        </Menu.Item>
        <Menu.Item key={MANAGE_USER_APP_URL} icon={<UserOutlined />}>
          <Link to={MANAGE_USER_APP_URL}>Manage Users</Link>
        </Menu.Item>
        <Menu.Item key={MANAGE_CATEGORY_APP_URL} icon={<FolderOpenOutlined />}>
          <Link to={MANAGE_CATEGORY_APP_URL}>Manage Category</Link>
        </Menu.Item>
        <Menu.Item key={MANAGE_EXPESENS_APP_URL} icon={<DollarOutlined />}>
          <Link to={MANAGE_EXPESENS_APP_URL}>Manage Expenses</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Sidebar;
