import { Input } from "antd";
import React from "react";
import { Form } from "react-bootstrap";
const PasswordInput = ({
  label,
  placeholder,
  inputClass,
  name,
  value,
  error,
  handleOnChange,
  isRequired
}) => {
  // Determine status and error message display
  const showError = isRequired ? !!error : !!value && !!error;
  const status = showError ? "error" : "";

  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label>
          {label} {isRequired && <span className="text-danger">*</span>}
        </Form.Label>
        <Input.Password
          placeholder={placeholder}
          className={inputClass}
          name={name}
          value={value}
          status={status}
          onChange={handleOnChange}
          onBlur={handleOnChange}
        />
        {showError && <p className="text-danger">{error}</p>}
      </Form.Group>
    </>
  );
};

export default PasswordInput;
