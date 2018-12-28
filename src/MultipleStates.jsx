import React, { useState } from "react";

export function MultipleStates() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
      <p>Flag is {flag.toString()}</p>
      <button onClick={() => setFlag(!flag)}>Change flag</button>
    </div>
  );
}