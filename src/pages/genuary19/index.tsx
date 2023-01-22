import React from "react";

import { Header } from "../../components/Header";
import loadable from "@loadable/component";

const Component = loadable(() => import("../../sketches/Genuary19"));

const Page: React.FC = () => {
  return (
    <>
      <Header />

      <Component />
    </>
  );
};

export default Page;
