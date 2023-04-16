import React from "react";

import loadable from "@loadable/component";
import { SEO } from "../../components/SEO";
import { HeadProps } from "gatsby";

const Component = loadable(() => import("../../sketches/Optical1"));

export const Head: React.FC<HeadProps> = ({ location }) => (
  <SEO
    title="Optical 1"
    description="An optical pattern from Peter Koepke's Patterns book"
    pathname={location.pathname}
  />
);

export default Component;
