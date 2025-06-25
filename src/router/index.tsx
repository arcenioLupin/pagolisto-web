import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "@/pages/Login/LoginPage";
import SignupPage from "@/pages/Signup/SignupPage";
import ConfiguracionPage from "@/pages/Configuration/ConfigurationPage";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import MainLayout from "@/layouts/MainLayout";
import DashboardPage from "@/pages/Dashboard/DashboardPage";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <PublicRoute redirectTo="/configuration">
              <SignupPage />
            </PublicRoute>
          }
        />

        <Route
          path="/configuration"
          element={
            <PrivateRoute>
              <ConfiguracionPage />
            </PrivateRoute>
          }
        />

        <Route path="/dashboard" element={
          <PrivateRoute>
            <MainLayout>
              <DashboardPage />
            </MainLayout>
          </PrivateRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
};
