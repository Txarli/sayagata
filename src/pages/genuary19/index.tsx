import React from "react";
import { useP5Sketch } from "../../useP5Sketch";

import { sketch } from "./genuary19.sketch";

import { Header } from "../../components/Header";

const Genuary19: React.FC = () => {
  const ref = useP5Sketch(sketch);

  return (
    <>
      <Header />

      <div ref={ref as React.RefObject<HTMLDivElement>} />
    </>
  );
};

export default Genuary19;
