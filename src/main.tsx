import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AppRoutes } from "./router/index";
import "../index.css";

import { Loading } from "components/loader";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Suspense fallback={<Loading></Loading>}>
    <BrowserRouter>
      <AppRoutes />
      <ToastContainer />
    </BrowserRouter>
  </Suspense>
);
