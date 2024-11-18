import { getHeaderOptions } from "../../utils/utils";
import routes from "../config";
import { api } from "../config/axiosConfig";

const headerOptions = {
  headers: {
    "Content-Type": "application/json",
  },
};

export interface AuthData {
  username: string;
  password: string;
}

interface AuthResponse {
  userId: string;
  token: string;
  role: string;
  username: string;
  expirationTime?: number;
  permissions?: {
    functionName: string;
    permissions: Array<"read" | "write" | "delete" | "update">;
  };
}

const authenticate = async (data: AuthData): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>(
    routes.AUTH.LOGIN(),
    data,
    headerOptions
  );

  return response.data;
};

const validateToken = async (token: string): Promise<number> => {
  const response = await api.get<number>(
    routes.AUTH.VALIDATE_TOKEN(),
    getHeaderOptions(token)
  );

  return response.status;
};

export { authenticate, validateToken };
