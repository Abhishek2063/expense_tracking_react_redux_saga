import { DatePicker } from "antd";
import { isAfter, startOfDay } from "date-fns";
import dayjs from "dayjs";
import React from "react";
import { Form } from "react-bootstrap";

const DateInput = ({
  label,
  name,
  value,
  error,
  onChange,
  isRequired = false,
}) => {
  const handleDateChange = (val) => {
    if (val) {
      const pickUp = dayjs(val).format("MM-DD-YYYY");
      onChange({ target: { name: name, value: pickUp } });
    } else {
      onChange({ target: { name: name, value: "" } });
    }
  };
  return (
    <Form.Group className="mb-3">
      <Form.Label>
        {label} {isRequired && <span className="text-danger">*</span>}
      </Form.Label>
      <DatePicker
        style={{ width: "100%" }}
        name={name}
        defaultValue={value ? new Date(value) : null}
        format="MM-DD-YYYY"
        onChange={(date) => handleDateChange(date)}
        disabledDate={(current) =>
          current && isAfter(current, startOfDay(new Date()))
        }
      />

      {error && <p className="text-danger">{error}</p>}
    </Form.Group>
  );
};
export default DateInput;
