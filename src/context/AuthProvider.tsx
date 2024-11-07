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
  [key: string]: unknown;
}

interface AuthContextType {
  auth: AuthState;
  setAuth: Dispatch<SetStateAction<AuthState>>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: Readonly<AuthProviderProps>) {
  const [auth, setAuth] = useState<AuthState>({});

  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) {
      const parsedAuth = JSON.parse(storedAuth);

      setAuth(parsedAuth);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("auth");
    setAuth({});
  };

  const value = useMemo(() => ({ auth, setAuth, logout }), [auth, setAuth]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
