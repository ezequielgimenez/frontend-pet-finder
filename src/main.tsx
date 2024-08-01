import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { AppRoutes } from "./router/index";
import "../index.css";

import { RecoilRoot } from "recoil";
import { Loading } from "components/loader";

ReactDOM.createRoot(document.getElementById("root")).render(
  <RecoilRoot>
    <Suspense fallback={<Loading></Loading>}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Suspense>
  </RecoilRoot>
);
