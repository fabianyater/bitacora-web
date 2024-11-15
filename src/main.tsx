import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App.tsx";
import { AuthProvider } from "./context/AuthProvider.tsx";
import "./index.css";
import PrivateRoute from "./ui/components/PrivateRoute/PrivateRoute.tsx";
import { Dashboard } from "./ui/pages/private/dashboard/Dashboard.tsx";
import { LocationsPage } from "./ui/pages/private/locations/LocationsPage.tsx";
import CreateLogBookPage from "./ui/pages/private/logbooks/create/CreateLogBookPage.tsx";
import Details from "./ui/pages/private/logbooks/details/Details.tsx";
import ListLogbook from "./ui/pages/private/logbooks/ListLogbook/ListLogbook.tsx";
import { LogBookPage } from "./ui/pages/private/logbooks/LogBookPage.tsx";
import { LoginPage } from "./ui/pages/public/login/LoginPage.tsx";
import { RegisterPage } from "./ui/pages/public/register/Register.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
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
            >
              <Route
                index
                element={
                  <PrivateRoute allowedRoles={["researcher", "partner"]}>
                    <ListLogbook />
                  </PrivateRoute>
                }
              />
              <Route
                path="new"
                element={
                  <PrivateRoute allowedRoles={["researcher", "partner"]}>
                    <CreateLogBookPage />
                  </PrivateRoute>
                }
              />
              <Route
                path=":userId"
                element={
                  <PrivateRoute allowedRoles={["researcher", "partner"]}>
                    <Details />
                  </PrivateRoute>
                }
              />
            </Route>
            <Route
              path="/locations"
              element={
                <PrivateRoute allowedRoles={["researcher", "partner"]}>
                  <LocationsPage />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
