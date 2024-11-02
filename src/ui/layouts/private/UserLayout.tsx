import { ReactNode } from "react";

type UserLayoutPropsType = {
  children?: ReactNode;
};

export const UserLayout = ({ children }: UserLayoutPropsType) => {
  return <div>{children}</div>;
};
