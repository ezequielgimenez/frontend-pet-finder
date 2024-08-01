import React from "react";
import { Routes, Route } from "react-router-dom";

import { MyHeader } from "components/header";

//pages
import { AboutSite } from "pages/aboutSite";
import { HomePage } from "pages/home";
import { AuthPage } from "pages/auth";
import { LoginPage } from "pages/login";
import { RegisterPage } from "pages/register";
import { RegisterPageTwo } from "pages/register-two";
import { MisDatos } from "pages/my-data";
import { EditDataPage } from "pages/edit-data";
import { EditPasswordPage } from "pages/edit-password";
import { MascotasCercaPage } from "pages/mascotas-cerca";
import { MyReportsPage } from "pages/my-reports";
import { ReportPetPage } from "pages/report-pet";
import { ReportSendPage } from "pages/report-pet/report-send";
import { ReportSendErrorPage } from "pages/report-pet/report-send/error";
import { ReportErrorPage } from "pages/report-pet/report-error";
import { ReportSuccessPage } from "pages/report-pet/report-success";
import { EditReportPet } from "components/edit-report-pet";
import { RecoveryPasswordPage } from "pages/recovery-password";
import { ChangePasswordPage } from "pages/change-password";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MyHeader />}>
        <Route index element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/about" element={<AboutSite />} />
        <Route path="/signIn" element={<LoginPage />} />
        <Route path="/signUp" element={<RegisterPage />} />
        <Route path="/signup/step-two" element={<RegisterPageTwo />} />
        <Route path="/mis-datos" element={<MisDatos />} />
        <Route path="/edit-data" element={<EditDataPage />} />
        <Route path="/edit-password" element={<EditPasswordPage />} />
        <Route path="/recovery-password" element={<RecoveryPasswordPage />} />
        <Route
          path="/change-password/token/:token"
          element={<ChangePasswordPage />}
        />
        <Route path="/mascotas-cerca" element={<MascotasCercaPage />} />
        <Route path="/mis-reportes" element={<MyReportsPage />} />
        <Route path="/report-pet" element={<ReportPetPage />} />
        <Route path="/report-error" element={<ReportErrorPage />} />
        <Route path="/report-success" element={<ReportSuccessPage />} />
        <Route path="/send-success" element={<ReportSendPage />} />
        <Route path="/send-error" element={<ReportSendErrorPage />} />
        <Route path="/edit-report" element={<EditReportPet />} />
      </Route>
    </Routes>
  );
}
