import * as React from "react";
import type { HeadFC } from "gatsby";
import { RandomPageRedirect } from "../../components/RandomPageRedirect";
import { SEO } from "../../components/SEO";

export default RandomPageRedirect;

export const Head: HeadFC = () => <SEO />;
