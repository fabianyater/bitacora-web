import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../../hooks/useAuth";

export type PrivateRouteProps = {
  children: ReactNode;
  adminChildren?: ReactNode;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  adminChildren,
}) => {
  const { auth } = useAuthContext();

  if (!auth.token) {
    return <Navigate to="/" />;
  }

  if (auth.role === "admin" && adminChildren) {
    return <>{adminChildren}</>;
  }

  return <>{children}</>;
};

export default PrivateRoute;
