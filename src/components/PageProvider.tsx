import React, { PropsWithChildren } from "react";
import { Header } from "./Header";

export const PageProvider: React.FC<
  PropsWithChildren<{ location: Location }>
> = ({ location, children }) => {
  return (
    <>
      <Header pathname={location.pathname} />
      {children}
    </>
  );
};
