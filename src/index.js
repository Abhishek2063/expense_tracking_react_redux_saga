import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "antd/dist/reset.css";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Loader from "./compoenents/Loader";
import { store } from "./store/store.factory";
import AllRoutes from "./routing/route";
import { message } from "antd";

message.config({
  maxCount: 1,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Suspense fallback={<Loader />}>
      <Provider store={store}>
        <BrowserRouter>
          <AllRoutes />
        </BrowserRouter>
      </Provider>
    </Suspense>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
