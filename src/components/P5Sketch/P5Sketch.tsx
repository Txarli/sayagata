import React from "react";
import P5 from "p5";
import { useP5Sketch } from "./useP5Sketch";

interface Props {
  sketch: (p5: P5) => void;
  wrapperStyle?: React.CSSProperties;
}

export const P5Sketch: React.FC<Props> = ({ sketch, wrapperStyle }) => {
  const ref = useP5Sketch(sketch);

  return (
    <div style={wrapperStyle} ref={ref as React.RefObject<HTMLDivElement>} />
  );
};
