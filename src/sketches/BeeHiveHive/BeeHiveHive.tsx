import React from "react";
import { P5Sketch } from "../../components/P5Sketch";

import { sketch } from "./beeHiveHive.sketch";

const BeeHiveHive = () => (
  <P5Sketch
    sketch={sketch}
    wrapperStyle={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
    }}
  />
);

export default BeeHiveHive;
