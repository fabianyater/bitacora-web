import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";

interface AuthState {
  token?: string;
  userId?: string;
  role?: string;
  username?: string;
  expirationTime?: number;
  [key: string]: unknown;
}

interface AuthContextType {
  expiredSession: boolean;
  setExpiredSession: Dispatch<SetStateAction<boolean>>;
  auth: AuthState;
  setAuth: Dispatch<SetStateAction<AuthState>>;
  loading: boolean;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: Readonly<AuthProviderProps>) {
  const [expiredSession, setExpiredSession] = useState<boolean>(false);
  const [auth, setAuth] = useState<AuthState>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) {
      const parsedAuth = JSON.parse(storedAuth);

      setAuth(parsedAuth);
    }

    setLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem("auth");
    setAuth({});
  };

  const value = useMemo(
    () => ({
      auth,
      setAuth,
      expiredSession,
      setExpiredSession,
      loading,
      logout,
    }),
    [auth, setAuth, expiredSession, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
