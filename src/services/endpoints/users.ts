import { IUserResponse, Roles, User } from "../../utils/types/userTypes";
import { getHeaderOptions } from "../../utils/utils";
import routes from "../config";
import { api } from "../config/axiosConfig";

const registerResearcher = async (data: User): Promise<Response> => {
  const response = await api.post<Response>(
    routes.USER.REGISTER_RESEARCHER(),
    data,
    getHeaderOptions()
  );

  return response.data;
};

const registerPartner = async (data: User): Promise<Response> => {
  const response = await api.post<Response>(
    routes.USER.REGISTER_PARTNER(),
    data,
    getHeaderOptions()
  );

  return response.data;
};

const registerUser = async (data: User, role: Roles): Promise<Response> => {
  if (role === "partner") return registerPartner(data);

  return registerResearcher(data);
};

const getUsers = async (token: string): Promise<IUserResponse> => {
  const response = await api.get<IUserResponse>(
    routes.USER.GET_USERS(),
    getHeaderOptions(token)
  );

  return response.data;
};

const getProfile = async (
  token: string,
  id: string
): Promise<IUserResponse> => {
  const response = await api.get<IUserResponse>(
    routes.USER.GET_PROFILE(id),
    getHeaderOptions(token)
  );

  return response.data;
};

export {
  getProfile, getUsers,
  registerPartner,
  registerResearcher,
  registerUser
};

