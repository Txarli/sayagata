import { navigate } from "gatsby";
import React, { useEffect } from "react";
import { useInternalPaths } from "../hooks/useInternalPaths";

export const RandomPageRedirect: React.FC = () => {
  const pathsExcludin404PagesOrHome = useInternalPaths().filter(
    (path) => !(/404/.test(path) || /^\/$/.test(path))
  );

  useEffect(() => {
    const randomPath =
      pathsExcludin404PagesOrHome[
        Math.floor(Math.random() * pathsExcludin404PagesOrHome.length)
      ];

    navigate(randomPath)
  });

  return null;
};
