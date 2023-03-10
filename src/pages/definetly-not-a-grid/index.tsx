import React from "react";

import loadable from "@loadable/component";
import { SEO } from "../../components/SEO";
import { HeadProps } from "gatsby";

const Component = loadable(() => import("../../sketches/Genuary18"));

export const Head: React.FC<HeadProps> = ({ location }) => (
  <SEO
    title="Definetly not a grid"
    description="A sketch created for the Genuary 2022 18th day with the prompt: Definetly not a grid"
    pathname={location.pathname}
  />
);

export default Component;
