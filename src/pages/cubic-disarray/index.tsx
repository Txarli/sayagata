import React from "react";

import loadable from "@loadable/component";
import { SEO } from "../../components/SEO";
import { HeadProps } from "gatsby";

const Component = loadable(() => import("../../sketches/CubicDisarray"));

export const Head: React.FC<HeadProps> = ({ location }) => (
  <SEO
    title="Cubic disarray"
    description="An interpretation of George Nees's generative artwork Cubic Disarray"
    pathname={location.pathname}
  />
);

export default Component;
