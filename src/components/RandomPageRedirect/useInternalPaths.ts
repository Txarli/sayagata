import { graphql, useStaticQuery } from "gatsby";

export const useInternalPaths = (): string[] => {
  const {
    pages: { nodes },
  } = useStaticQuery(graphql`
    {
      pages: allSitePage {
        nodes {
          path
        }
      }
    }
  `);

  return nodes.map((node: { path: string }) => node.path);
};
