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
  token: string;
  role: string;
  username: string;
}

const authenticate = async (data: AuthData): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>(
    routes.AUTH.LOGIN(),
    data,
    headerOptions
  );

  return response.data;
};

export { authenticate };
