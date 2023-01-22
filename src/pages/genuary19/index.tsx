import React, { useState } from "react";
import { useP5Sketch } from "../../useP5Sketch";

import "./header.scss";

import { sketch } from "./genuary19.sketch";

import PinIcon from "./pin.svg";
import PinOffIcon from "./pin-off.svg";

const Genuary19: React.FC = () => {
  const ref = useP5Sketch(sketch);

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

      <div ref={ref as React.RefObject<HTMLDivElement>} />
    </>
  );
};

export default Genuary19;
