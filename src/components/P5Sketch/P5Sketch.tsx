import React from "react";
import P5 from "p5";
import { useP5Sketch } from "./useP5Sketch";

export const P5Sketch: React.FC<{ sketch: (p5: P5) => void }> = ({ sketch }) => {
  const ref = useP5Sketch(sketch);

  return <div ref={ref as React.RefObject<HTMLDivElement>} />;
};

