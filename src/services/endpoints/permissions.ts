import { IPermission } from "../../utils/types/permissionTypes";
import { getHeaderOptions } from "../../utils/utils";
import routes from "../config";
import { api } from "../config/axiosConfig";

const getPermissions = async (token: string): Promise<IPermission[]> => {
  const response = await api.get<IPermission[]>(
    routes.PERMISSIONS.ALL(),
    getHeaderOptions(token)
  );

  return response.data;
};

export { getPermissions };

