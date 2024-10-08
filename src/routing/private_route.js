import React from "react";
import {
  DASHBOARD_APP_URL,
  MANAGE_CATEGORY_APP_URL,
  MANAGE_EXPESENS_APP_URL,
  MANAGE_MODULE_APP_URL,
  MANAGE_ROLE_APP_URL,
  MANAGE_USER_APP_URL,
} from "../utils/app_route_list";

export const DASHBOARD_APP_COMPONENT = React.lazy(() =>
  import("../pages/dashboard/Dashbaord")
);
export const MANAGE_MODULE_APP_COMPONENT = React.lazy(() =>
  import("../pages/manage_modules/ManageModules")
);
export const MANAGE_ROLE_APP_COMPONENT = React.lazy(() =>
  import("../pages/manage_role/ManageRole")
);
export const MANAGE_USER_APP_COMPONENT = React.lazy(() =>
  import("../pages/manage_users/ManageUser")
);
export const MANAGE_CATEGORY_APP_COMPONENT = React.lazy(() =>
  import("../pages/manage_category/ManageCategory")
);
export const MANAGE_EXPENSE_APP_COMPONENT = React.lazy(() =>
  import("../pages/manage_expanses/ManageExpenses")
);

export const PrivateRoutes = [
  {
    path: DASHBOARD_APP_URL,
    component: <DASHBOARD_APP_COMPONENT />,
    exact: true,
  },
  {
    path: MANAGE_MODULE_APP_URL,
    component: <MANAGE_MODULE_APP_COMPONENT />,
  },
  {
    path: MANAGE_ROLE_APP_URL,
    component: <MANAGE_ROLE_APP_COMPONENT />,
  },
  {
    path: MANAGE_USER_APP_URL,
    component: <MANAGE_USER_APP_COMPONENT />,
  },
  {
    path: MANAGE_CATEGORY_APP_URL,
    component: <MANAGE_CATEGORY_APP_COMPONENT />,
  },
  {
    path: MANAGE_EXPESENS_APP_URL,
    component: <MANAGE_EXPENSE_APP_COMPONENT />,
  },
];
