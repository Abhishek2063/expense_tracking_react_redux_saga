import React from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRouteHandler, { LoginRouteHandler, PublicRouteHandler, Template } from "./Layout";
import Signin from "../pages/signin/Signin";
import Dashbaord from "../pages/dashboard/Dashbaord";
import Empty from "../utils/Empty";
import { PublicRoutes } from './public_route';
import { PrivateRoutes } from "./private_route";

const AllRoutes = () => {
  return (
    <>
      <Routes>
         {/* Login routes  */}
         <Route element={<LoginRouteHandler />}>
          <Route key="/" path="/" element={<Signin />} />
        </Route>

        {/* Public routes  */}
        <Route element={<PublicRouteHandler />}>
          <Route key="/" path="/" element={<Signin />} />
          {PublicRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.component} />
          ))}
        </Route>

        {/* Private routes */}
        <Route element={<PrivateRouteHandler />}>
          <Route
            key="/"
            path="/"
            element={
              <Template>
                <Dashbaord />
              </Template>
            }
          />
          {PrivateRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={<Template>{route.component}</Template>}
            />
          ))}
        </Route>

        <Route path="*" element={<Empty />} />
      </Routes>
    </>
  );
};

export default AllRoutes;
