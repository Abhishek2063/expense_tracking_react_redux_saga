import React from "react";
import { Button } from "react-bootstrap";
import { PlusOutlined } from "@ant-design/icons";

const AddButton = ({ onClick, title }) => (
  <Button variant="primary" onClick={onClick}>
    <PlusOutlined /> {title}
  </Button>
);

export default AddButton;
