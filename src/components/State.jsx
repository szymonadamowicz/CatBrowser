import React, { useState } from "react";

export const State = () => {
  const [count, setCount] = useState(0);

  return { count, setCount };
};
