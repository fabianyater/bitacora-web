import { ReactNode } from "react";

type AdminLayoutPropsType = {
  children?: ReactNode;
};

export const AdminLayout = ({ children }: AdminLayoutPropsType) => {
  return <div>{children}</div>;
};
