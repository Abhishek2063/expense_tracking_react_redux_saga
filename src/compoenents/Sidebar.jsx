import React from 'react';
import { Menu } from 'antd';
import { HomeOutlined, BarChartOutlined, SettingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import "../assests/css/sidebar.css"
const Sidebar = ({ isOpen }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <Menu mode="inline" theme="dark">
        <Menu.Item key="home" icon={<HomeOutlined />}>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="dashboard" icon={<BarChartOutlined />}>
          <Link to="/dashboard">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="settings" icon={<SettingOutlined />}>
          <Link to="/settings">Settings</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Sidebar;