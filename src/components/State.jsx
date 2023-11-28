import React, { useState } from "react";

export const State = () => {
  const [count, setCount] = useState(1);

  return { count, setCount };
};
