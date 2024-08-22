import React from "react";
import { Form, Button } from "react-bootstrap";
import Inputtext from "../Inputtext";
import PasswordInput from "../PasswordInput";
import { LOGIN_APP_URL } from '../../utils/app_route_list';
import { Link } from "react-router-dom";

const RegistrationForm = ({ values, errors, handleChange, handleSubmit }) => {
  return (
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
      <Inputtext
        placeholder="Enter email."
        name="email"
        value={values.email}
        error={errors.email}
        label="Email"
        isRequired={true}
        handleOnChange={handleChange}
      />
      <PasswordInput
        placeholder="Enter password."
        name="password"
        value={values.password}
        error={errors.password}
        label="Password"
        isRequired={true}
        handleOnChange={handleChange}
      />
      <PasswordInput
        placeholder="Enter confirm password."
        name="confirm_password"
        value={values.confirm_password}
        error={errors.confirm_password}
        label="Confirm Password"
        isRequired={true}
        handleOnChange={handleChange}
      />
      <Button variant="primary" type="submit" className="w-100">
        Register
      </Button>
      <Link to={LOGIN_APP_URL}>
        <span className="mt-4">Already have an account. Login In?</span>
    </Link>
    </Form>
  );
};

export default RegistrationForm;
