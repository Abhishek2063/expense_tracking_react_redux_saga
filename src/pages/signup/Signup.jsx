import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../../assests/css/registration_page.css";
import background_image from "../../assests/images/pexels-pixabay-417173.jpg";
import logo_image from "../../assests/images/large-removebg-preview.png";
import { fieldValidator, usePrevious } from "../../utils/custom_validation";
import Loader from "../../compoenents/Loader";
import useForm from "../../hooks/useForm";
import RegistrationCard from "../../compoenents/signup/RegistrationCard";
import { useDispatch, useSelector } from "react-redux";
import { registration } from "../../redux/signup/signup.action";
import { message } from "antd";
import { LOGIN_APP_URL } from "../../utils/app_route_list";
import { useNavigate } from "react-router-dom";
import _ from "lodash";

const initialState = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  confirm_password: "",
};

const validationRules = {
  first_name: (value) =>
    fieldValidator("first_name", value, "alphabetics", 20, 3).errorMsg,
  last_name: (value) =>
    value
      ? fieldValidator("last_name", value, "alphabetics", 20, 3).errorMsg
      : null,
  email: (value) => fieldValidator("email", value, "email", null, 3).errorMsg,
  password: (value) =>
    fieldValidator("password", value, "password", 20, 8).errorMsg,
  confirm_password: (value, values) =>
    fieldValidator(
      "confirm_password",
      value,
      "password",
      20,
      8,
      values.password
    ).errorMsg,
};

const Signup = () => {
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { values, errors, handleChange, handleSubmit } = useForm(
    initialState,
    validationRules
  );
  const registrationData = useSelector((state) => state.signup.registerData);
  const prevregistrationData = usePrevious({ registrationData });

  const onSubmit = (formData) => {
    setLoader(true);

    const data = {
      first_name: formData.first_name.trim(),
      last_name: formData.last_name.trim(),
      email: formData.email.trim().toLowerCase(),
      password: formData.password.trim(),
    };
    dispatch(registration(data));
  };

  useEffect(() => {
    if (
      prevregistrationData &&
      prevregistrationData.registrationData !== registrationData
    ) {
      if (
        registrationData &&
        _.has(registrationData, "data") &&
        registrationData.success === true
      ) {
        message.success(registrationData.message);
        setLoader(false);
        navigate(LOGIN_APP_URL);
      }
      if (registrationData && registrationData.success === false) {
        setLoader(false);

        message.error(registrationData.message);
      }
    } // eslint-disable-next-line
  }, [registrationData, prevregistrationData]);

  const formProps = {
    values,
    errors,
    handleChange,
    handleSubmit: handleSubmit(onSubmit),
  };
  return (
    <div className="registration-page">
      <Container fluid className="h-100">
        <Row className="h-100 align-items-center justify-content-center">
          <Col xs={12} md={10} lg={8}>
            <RegistrationCard
              backgroundImage={background_image}
              logoImage={logo_image}
              formProps={formProps}
            />
          </Col>
        </Row>
      </Container>
      {loader && <Loader />}
    </div>
  );
};

export default Signup;
