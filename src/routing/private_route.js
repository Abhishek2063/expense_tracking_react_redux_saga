import React from "react";
import { DASHBOARD_APP_URL } from "../utils/app_route_list";

export const DASHBOARD_APP_COMPONENT = React.lazy(() =>
  import("../pages/dashboard/Dashbaord")
);

export const PrivateRoutes = [
  {
    path: DASHBOARD_APP_URL,
    component: <DASHBOARD_APP_COMPONENT />,
    exact: true,
  },
];
