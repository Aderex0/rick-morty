import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const BasicLayout = ({ children }: Props) => {
  return <div className="flex w-full p-4 items-center flex-col">{children}</div>;
};

export default BasicLayout;
