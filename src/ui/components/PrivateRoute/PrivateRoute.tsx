import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../../hooks/useAuth";

export type PrivateRouteProps = {
  children: ReactNode;
  allowedRoles?: string[];
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const { auth } = useAuthContext();

  if (!auth.token) {
    return <Navigate to="/" />;
  }

  if (!auth.role || (allowedRoles && !allowedRoles.includes(auth.role))) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
