import React, { useState } from "react";
import PinIcon from "./icons/pin.svg";
import PinOffIcon from "./icons/pin-off.svg";
import RandomIcon from "./icons/random.svg";

import "./Header.scss";
import { useInternalPaths } from "../../hooks/useInternalPaths";
import { navigate } from "gatsby";

interface Props {
  pathname?: string;
}

export const Header: React.FC<Props> = ({ pathname }) => {
  const [isPinned, setIsPinned] = useState(false);
  const paths = useInternalPaths();

  return (
    <>
      <div className="hover-visibility" aria-hidden></div>
      <header className={`header ${isPinned ? "hidden" : ""}`}>
        <div>
          <h1 className="title">Sayagata</h1>
          <p>
            A collection of generative patterns, textures, tilings and whatnots.
          </p>
        </div>

        <div className="buttons-wrapper" aria-hidden>
          <button
            type="button"
            className="control-button"
            onClick={() => setIsPinned(!isPinned)}
            title={isPinned ? "Pin the header" : "Hide the header"}
            tabIndex={-1}
          >
            {isPinned ? <PinIcon /> : <PinOffIcon />}
          </button>

          <button
            type="button"
            className="control-button"
            onClick={handleRandomClick}
            title="Go to a random design"
            tabIndex={-1}
          >
            {<RandomIcon />}
          </button>
        </div>
      </header>
    </>
  );

  function handleRandomClick() {
    const pathsExcludin404PagesOrHome = paths.filter(
      (path) => !(/404/.test(path) || /^\/$/.test(path)) && path !== pathname
    );
    const randomPath =
      pathsExcludin404PagesOrHome[
        Math.floor(Math.random() * pathsExcludin404PagesOrHome.length)
      ];
    console.log("going to", randomPath);
    navigate(randomPath);
  }
};
