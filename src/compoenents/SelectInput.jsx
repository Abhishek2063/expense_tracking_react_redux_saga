import { Select } from "antd";
import React from "react";
import { Form } from "react-bootstrap";
const { Option } = Select;

const SelectInput = ({
  label,
  name,
  value,
  error,
  options,
  onChange,
  isRequired = false,
  placeholder,
}) => (
  <Form.Group className="mb-3">
    <Form.Label>
      {label} {isRequired && <span className="text-danger">*</span>}
    </Form.Label>
    <Select
      style={{ width: "100%" }}
      value={value}
      onSelect={(value) => onChange({ target: { name, value } })}
      placeholder={placeholder}
    >
      {options.map((option) => (
        <Option value={option.value} key={option.value}>
          {option.label}
        </Option>
      ))}
    </Select>
    {error && <p className="text-danger">{error}</p>}
  </Form.Group>
);

export default SelectInput;
