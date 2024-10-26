export interface User {
  username: string;
  email: string;
  password: string;
}

export interface Response {
  message: string;
}

export type Roles = "admin" | "researcher" | "partner";

export interface IUserResponse {
  id: number;
  username: string;
  email: string;
  role: Roles;
}
