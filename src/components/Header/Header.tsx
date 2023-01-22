import React, { useState } from "react";
import PinIcon from "./icons/pin.svg";
import PinOffIcon from "./icons/pin-off.svg";

import "./Header.scss";

export const Header: React.FC = () => {
  const [isPinned, setIsPinned] = useState(false);

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

        <div aria-hidden>
          <button
            type="button"
            className="control-button"
            onClick={() => setIsPinned(!isPinned)}
            title={isPinned ? "Pin the header" : "Hide the header"}
            tabIndex={-1}
          >
            {isPinned ? <PinIcon /> : <PinOffIcon />}
          </button>
        </div>
      </header>
    </>
  );
};
