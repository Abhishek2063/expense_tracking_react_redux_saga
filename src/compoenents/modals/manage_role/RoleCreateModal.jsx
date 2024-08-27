import React from "react";
import { Button, Form } from "react-bootstrap";
import Inputtext from "../../Inputtext";
import { Modal } from "antd";

const RoleCreateModal = ({
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
            placeholder="Enter name."
            name="name"
            value={values.name}
            error={errors.name}
            label="Name"
            isRequired={true}
            handleOnChange={handleChange}
          />
          <Inputtext
            placeholder="Enter description."
            name="description"
            value={values.description}
            error={errors.description}
            label="Description"
            isRequired={false}
            handleOnChange={handleChange}
          />
        </Form>
      </Modal>
    </>
  );
};
export default RoleCreateModal;
