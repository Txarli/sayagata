import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <>
      <h1>Sayagata</h1>
      <p>Generative patterns, textures, tilings and whatnots</p>
    </>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Sayagata</title>;
