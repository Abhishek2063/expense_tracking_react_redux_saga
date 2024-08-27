import React from "react";
import { Button } from "react-bootstrap";
import { PlusOutlined } from "@ant-design/icons";

const AddRoleButton = ({ onClick }) => (
  <Button variant="primary" onClick={onClick}>
    <PlusOutlined /> Add Role
  </Button>
);

export default AddRoleButton;
