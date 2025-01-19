import React from "react";
import { useCounter } from "@/hooks/useCounter";

export const Counter = () => {
  const { count, reset, increment } = useCounter();
  return (
    <>
      <p>Count: {count}</p>
      <button onClick={() => increment()}>+1</button>
      <button onClick={() => reset()}>Reset</button>
    </>
  );
};
