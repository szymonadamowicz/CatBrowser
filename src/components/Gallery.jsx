import React from "react";
import { State } from "./State";

export default function Browser() {
  const { count, setCount } = State();

  return (
    <div>
      <div className="gallery">
        <div className="pictures">
          <p>{"[Placeholder]"}</p>
        </div>
      </div>
      <div className="buttons">
        <button
          style={{
            pointerEvents: count === 1 ? "none" : "unset",
            opacity: count === 1 ? "0.3" : "1",
          }}
          onClick={() => setCount(count - 1)}
        >
          {"<"}
        </button>
        <div>
          <p>{count}/20</p>
        </div>
        <button
          style={{
            pointerEvents: count === 20 ? "none" : "unset",
            opacity: count === 20 ? "0.3" : "1",
          }}
          onClick={() => setCount(count + 1)}
        >
          {">"}
        </button>
      </div>
      <div className="beginning">
        <button onClick={() => setCount(1)}>Go to the beginning</button>
      </div>
    </div>
  );
}
