import React from "react";

import { LOGIN_APP_URL, REGISTER_APP_URL } from "../utils/app_route_list";
export const LOGIN_APP_COMPONENT = React.lazy(() => import("../pages/signin/Signin"));

export const REGISTRATION_APP_COMPONENT = React.lazy(() =>
  import("../pages/signup/Signup")
);

export const PublicRoutes = [
  { path: LOGIN_APP_URL, component: <LOGIN_APP_COMPONENT />, exact: true },
  { path: REGISTER_APP_URL, component: <REGISTRATION_APP_COMPONENT /> },
];
