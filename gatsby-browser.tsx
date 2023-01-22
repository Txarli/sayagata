import React from "react";

import "./src/css/reset.css";
import "./src/css/reboot.css";

import { GatsbyBrowser } from "gatsby";
import { PageProvider } from "./src/components/PageProvider";

export const wrapPageElement: GatsbyBrowser["wrapPageElement"] = ({
  element,
  props,
}) => <PageProvider location={props.location}>{element}</PageProvider>;
