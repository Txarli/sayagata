import React from "react";

import loadable from "@loadable/component";
import { SEO } from "../../../components/SEO";
import { HeadProps } from "gatsby";

const Component = loadable(() => import("../../../sketches/Genuary23"));

export const Head: React.FC<HeadProps> = ({ location }) => (
  <SEO
    title="More Moiré"
    description="A sketch created for the Genuary 2022 23th day with the prompt: More Moiré"
    pathname={location.pathname}
  />
);

export default Component;
