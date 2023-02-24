import React from "react";

import loadable from "@loadable/component";
import { SEO } from "../../components/SEO";
import { HeadProps } from "gatsby";

const Component = loadable(() => import("../../sketches/BeeHiveHive"));

export const Head: React.FC<HeadProps> = ({ location }) => (
  <SEO
    title="Sticker: Bee hive hive"
    description="An hexagon filled with hexagons."
    pathname={location.pathname}
  />
);

export default Component;
