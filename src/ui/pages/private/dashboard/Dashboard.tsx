import { useAuthContext } from "../../../../hooks/useAuth";

export const Dashboard = () => {
  const { auth } = useAuthContext();

  return <h1>{auth.role}</h1>;
};
