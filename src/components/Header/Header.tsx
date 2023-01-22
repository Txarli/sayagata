import React, { useState } from "react";
import PinIcon from "./icons/pin.svg";
import PinOffIcon from "./icons/pin-off.svg";

import "./Header.scss";

export const Header: React.FC = () => {
  const [isPinned, setIsPinned] = useState(false);

  return (
    <>
      <div className="hover-visibility"></div>
      <header className={`header ${isPinned ? "hidden" : ""}`}>
        <div>
          <h1 className="title">Sayagata</h1>
          <p>
            A collection of generative patterns, textures, tilings and whatnots.
          </p>
        </div>

        <div>
          <button
            type="button"
            className="control-button"
            onClick={() => setIsPinned(!isPinned)}
            title={isPinned ? "Pin the header" : "Hide the header"}
            aria-label={isPinned ? "Pin the header" : "Hide the header"}
          >
            {isPinned ? <PinIcon /> : <PinOffIcon />}
          </button>
        </div>
      </header>
    </>
  );
};
