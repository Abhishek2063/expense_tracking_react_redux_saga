import React from "react";
import { Menu } from "antd";
import { BarChartOutlined, AppstoreOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "../assests/css/sidebar.css";
import {
  DASHBOARD_APP_URL,
  MANAGE_MODULE_APP_URL,
  MANAGE_ROLE_APP_URL,
} from "../utils/app_route_list";
const Sidebar = ({ isOpen }) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <Menu mode="inline" theme="dark">
        <Menu.Item key="dashboard" icon={<BarChartOutlined />}>
          <Link to={DASHBOARD_APP_URL}>Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="manage_module" icon={<AppstoreOutlined />}>
          <Link to={MANAGE_MODULE_APP_URL}>Manage Modules</Link>
        </Menu.Item>
        <Menu.Item key="manage_role" icon={<AppstoreOutlined />}>
          <Link to={MANAGE_ROLE_APP_URL}>Manage Roles</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Sidebar;
