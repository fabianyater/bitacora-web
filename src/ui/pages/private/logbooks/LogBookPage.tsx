import { useAuthContext } from "../../../../hooks/useAuth";

export const LogBookPage = () => {
  const { auth } = useAuthContext();
  return <h1>{auth.role}</h1>;
};
