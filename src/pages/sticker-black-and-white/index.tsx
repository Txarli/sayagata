import React from "react";

import loadable from "@loadable/component";
import { SEO } from "../../components/SEO";
import { HeadProps } from "gatsby";

const Component = loadable(() => import("../../sketches/StickerGenuary19"));

export const Head: React.FC<HeadProps> = ({ location }) => (
  <SEO
    title="Sticker: Black and white"
    description="The Black and white design inside an hexagon"
    pathname={location.pathname}
  />
);

export default Component;
