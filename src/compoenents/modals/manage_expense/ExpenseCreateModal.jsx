import React from "react";
import { Button, Form } from "react-bootstrap";
import Inputtext from "../../Inputtext";
import { DatePicker, Modal, Select } from "antd";
import { format } from "date-fns";
import SelectInput from "../../SelectInput";
import DateInput from "../../DateInput";

const { Option } = Select;

const ExpenseCreateModal = ({
  modal_title,
  modalOpen,
  handleClose,
  handleSubmit,
  values,
  errors,
  handleChange,
  categoryList,
  setValues,
}) => {
  const categoryOptions = categoryList.map((category) => ({
    value: category.id,
    label: category.name,
  }));

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
            placeholder="Enter amount."
            name="amount"
            value={values.amount}
            error={errors.amount}
            label="Amount"
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
          <SelectInput
            label="Select Category"
            name="category_id"
            value={values.category_id}
            error={errors.category_id}
            options={categoryOptions}
            onChange={handleChange}
            isRequired={true}
            placeholder="Select category"
          />
          <DateInput
            label="Date"
            name="date"
            value={values.date}
            error={errors.date}
            onChange={handleChange}
            isRequired={true}
          />
        </Form>
      </Modal>
    </>
  );
};

export default ExpenseCreateModal;
