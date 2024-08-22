import React from "react";
import { Form, Button } from "react-bootstrap";
import Inputtext from "../Inputtext";
import PasswordInput from "../PasswordInput";
import { Link } from "react-router-dom";
import { REGISTER_APP_URL } from "../../utils/app_route_list";

const LoginForm = ({ values, errors, handleChange, handleSubmit }) => {
  return (
    <Form onSubmit={handleSubmit}>
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

      <Button variant="primary" type="submit" className="w-100">
        Login
      </Button>
      <Link to={REGISTER_APP_URL}>
        <span className="mt-4">Don't have an account. Register?</span>
      </Link>
    </Form>
  );
};

export default LoginForm;
