import { jwtDecode } from "jwt-decode";
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
  [key: string]: unknown;
}

interface DecodedToken {
  userId: string;
  username: string;
  role: string;
  iat: number;
  exp: number;
}

interface AuthContextType {
  auth: AuthState;
  setAuth: Dispatch<SetStateAction<AuthState>>;
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
    const storedAuth = localStorage.getItem("token");
    if (storedAuth) {
      const parsedAuth = JSON.parse(storedAuth);

      if (parsedAuth.token) {
        const decodedToken = jwtDecode<DecodedToken>(parsedAuth.token);
        parsedAuth.userId = decodedToken.userId;
        parsedAuth.role = decodedToken.role;
      }

      setAuth(parsedAuth);
    }
  }, []);

  const value = useMemo(() => ({ auth, setAuth }), [auth, setAuth]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
