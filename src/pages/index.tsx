import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { RandomPageRedirect } from "../components/RandomPageRedirect/RandomPageRedirect";
import { SEO } from "../components/SEO";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <>
      <RandomPageRedirect />

      <h1>Sayagata</h1>
      <p>Generative patterns, textures, tilings and whatnots</p>
      <p>We are redirecting you to some beatiful generative art 🤗</p>
    </>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <SEO />;
