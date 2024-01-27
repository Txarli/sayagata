import React, { PropsWithChildren } from "react";
import { Header } from "./Header";

export const PageProvider: React.FC<
  PropsWithChildren<{ location: Location }>
> = ({ location, children }) => {
  return (
    <>
      {location.pathname !== "/photo" && (
        <Header pathname={location.pathname} />
      )}

      {children}
    </>
  );
};
