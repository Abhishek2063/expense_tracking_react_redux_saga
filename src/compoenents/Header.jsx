import React from "react";
import { Navbar, Container, Nav, Dropdown } from "react-bootstrap";
import { Avatar } from "antd";
import { MenuOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import "../assests/css/header.css";
import logoImage from "../assests/images/Untitled_design__1_-removebg-preview.png";
import { DASHBOARD_APP_URL, LOGIN_APP_URL } from "../utils/app_route_list";
import { removeLocalData } from "../storage/tokens";
import { clearUserDetails } from "../storage/user";
import { useNavigate } from "react-router-dom";
const Header = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    removeLocalData();
    clearUserDetails();
    navigate(LOGIN_APP_URL);
  };
  return (
    <Navbar bg="light" expand="lg" className="header">
      <Container fluid>
        <Navbar.Brand href={DASHBOARD_APP_URL}>
          <img src={logoImage} alt="Logo" height="50" width="200" />
        </Navbar.Brand>
        <Nav className="ms-auto">
          <Dropdown align="end">
            <Dropdown.Toggle as={Avatar} icon={<UserOutlined />} />
            <Dropdown.Menu>
              {/* <Dropdown.Item href="/profile">
                <UserOutlined /> Profile
              </Dropdown.Item> */}
              <Dropdown.Item onClick={handleLogout}>
                <LogoutOutlined /> Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
        <button
          className="d-lg-none ms-2 sidebar-toggle"
          onClick={toggleSidebar}
        >
          <MenuOutlined />
        </button>
      </Container>
    </Navbar>
  );
};

export default Header;
