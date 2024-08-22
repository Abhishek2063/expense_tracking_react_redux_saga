import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../../assests/css/login.css";
import background_image from "../../assests/images/pexels-pixabay-417173.jpg";
import logo_image from "../../assests/images/large-removebg-preview.png";
import { fieldValidator, usePrevious } from "../../utils/custom_validation";
import Loader from "../../compoenents/Loader";
import useForm from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import LoginCard from "../../compoenents/signin/LoginCard";
import { login_action } from "../../redux/signin/signin.action";
import { DASHBOARD_APP_URL } from "../../utils/app_route_list";
import { setUserDetails } from '../../storage/user';
import { setToken } from "../../storage/tokens";

const initialState = {
  email: "",
  password: "",
};

const validationRules = {
  email: (value) => fieldValidator("email", value, "email", null, 3).errorMsg,
  password: (value) =>
    fieldValidator("password", value, "password", 20, 8).errorMsg,
};

const Signin = () => {
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { values, errors, handleChange, handleSubmit } = useForm(
    initialState,
    validationRules
  );
  const loginData = useSelector((state) => state.login.loginData);
  const prevloginData = usePrevious({ loginData });

  const onSubmit = (formData) => {
    setLoader(true);
    const data = {
      email: formData.email.trim().toLowerCase(),
      password: formData.password.trim(),
    };
    dispatch(login_action(data));
  };

  useEffect(() => {
    if (
      prevloginData &&
      prevloginData.loginData !== loginData
    ) {
      if (
        loginData &&
        _.has(loginData, "data") &&
        loginData.success === true
      ) {
        setToken(loginData.data.token);
        setUserDetails(loginData.data)
        message.success(loginData.message);
        setLoader(false);
        navigate(DASHBOARD_APP_URL);
      }
      if (loginData && loginData.success === false) {
        setLoader(false);

        message.error(loginData.message);
      }
    } // eslint-disable-next-line
  }, [loginData, prevloginData]);

  const formProps = {
    values,
    errors,
    handleChange,
    handleSubmit: handleSubmit(onSubmit),
  };
  return (
    <div className="login-page">
      <Container fluid className="h-100">
        <Row className="h-100 align-items-center justify-content-center">
          <Col xs={12} md={10} lg={8}>
            <LoginCard
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

export default Signin;
