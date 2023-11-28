import React, { useState } from "react";

export default function Browser() {
  const [count, setCount] = useState(1);

  return (
    <div>
        <div className="pictures">
        </div>
        <div className="buttons">
            <div className="left">
              <button style={{ pointerEvents: count === 1 ? "none" : "unset" }}onClick={() => setCount(count - 1)}>🡸</button>
            </div>
            <div>
                <p>{count}/20</p>
            </div>
                <button style={{ pointerEvents: count === 20 ? "none" : "unset" }} onClick={() => setCount(count + 1)}>🡺</button>
            </div>
        <div className="beginning">
            <button onClick={() => setCount(1)}>Go to the beginning</button>
        </div>
    </div>

  );
}
