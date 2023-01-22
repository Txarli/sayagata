import React from "react";

import loadable from "@loadable/component";
import { SEO } from "../../components/SEO";
import { HeadProps } from "gatsby";

const Component = loadable(() => import("../../sketches/Genuary19"));

export const Head: React.FC<HeadProps> = ({ location }) => (
  <SEO
    title="Black and white"
    description="A sketch created for the Genuary 2022 18th day with the prompt: Black and White"
    pathname={location.pathname}
  />
);

export default Component;
