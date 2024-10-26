export interface IPermission {
  functionName: string;
  userId: string;
  role: string;
  permissions: Array<"read" | "write" | "delete" | "update">;
}
