import React from "react";

import loadable from "@loadable/component";
import { SEO } from "../../../components/SEO";
import { HeadProps } from "gatsby";

const Component = loadable(() => import("../../../sketches/PointToPoint"));

export const Head: React.FC<HeadProps> = ({ location }) => (
  <SEO
    title="Point to point"
    description="A grid of points colliding and changing their colors."
    pathname={location.pathname}
  />
);

export default Component;
