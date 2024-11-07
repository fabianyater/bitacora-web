import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/saga-blue/theme.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App.tsx";
import { AuthProvider } from "./context/AuthProvider.tsx";
import "./index.css";
import PrivateRoute from "./ui/components/PrivateRoute/PrivateRoute.tsx";
import { Dashboard } from "./ui/pages/private/dashboard/Dashboard.tsx";
import { LogBookPage } from "./ui/pages/private/logbooks/LogBookPage.tsx";
import { LoginPage } from "./ui/pages/public/login/LoginPage.tsx";
import { RegisterPage } from "./ui/pages/public/register/Register.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PrimeReactProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<App />}>
              <Route path="/" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute allowedRoles={["admin"]}>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/logbooks"
                element={
                  <PrivateRoute allowedRoles={["researcher", "partner"]}>
                    <LogBookPage />
                  </PrivateRoute>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </PrimeReactProvider>
  </StrictMode>
);
