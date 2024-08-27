import React from "react";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Button } from "react-bootstrap";

const ConfirmationPopup = ({
  isVisible,
  onConfirm,
  onCancel,
  title,
  content,
  confirmText = "Yes",
  cancelText = "No",
}) => {
  return (
    <Modal
      title={
        <span>
          <ExclamationCircleOutlined
            style={{ color: "#faad14", marginRight: "8px" }}
          />
          {title}
        </span>
      }
      open={isVisible}
      onCancel={onCancel}
      maskClosable={false}
      footer={[
        <Button
          key="cancel"
          variant="primary"
          className="me-2"
          onClick={onCancel}
        >
          {cancelText}
        </Button>,
        <Button key="submit" variant="danger" onClick={onConfirm}>
          {confirmText}
        </Button>,
      ]}
    >
      <p>{content}</p>
    </Modal>
  );
};

export default ConfirmationPopup;
