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
  const { auth, loading } = useAuthContext();

  if (loading) {
    return <h1>Cargando...</h1>;
  }

  if (
    !auth.token ||
    (allowedRoles && auth.role && !allowedRoles.includes(auth.role))
  ) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
