import React from "react";
import { Button, Form } from "react-bootstrap";
import Inputtext from "../../Inputtext";
import { Modal } from "antd";

const UpdateUserModal = ({
  modal_title,
  modalOpen,
  handleClose,
  handleSubmit,
  values,
  errors,
  handleChange,
}) => {
  return (
    <>
      <Modal
        title={modal_title}
        open={modalOpen}
        onCancel={handleClose}
        maskClosable={false}
        footer={[
          <Button
            key="cancel"
            variant="danger"
            className="me-2"
            onClick={handleClose}
          >
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleSubmit}>
            Submit
          </Button>,
        ]}
      >
        <Form onSubmit={handleSubmit}>
          <Inputtext
            placeholder="Enter first name."
            name="first_name"
            value={values.first_name}
            error={errors.first_name}
            label="First Name"
            isRequired={true}
            handleOnChange={handleChange}
          />
          <Inputtext
            placeholder="Enter last name."
            name="last_name"
            value={values.last_name}
            error={errors.last_name}
            label="Last Name"
            isRequired={false}
            handleOnChange={handleChange}
          />
        </Form>
      </Modal>
    </>
  );
};

export default UpdateUserModal;
