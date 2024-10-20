import React from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const LocalStorageExample = () => {
  const [count, setCount] = useLocalStorage("count", 0);

  const incrementCount = () => {
    // Using a function to update the count based on the previous value
    setCount((prevCount) => prevCount + 1);
  };

  const decrementCount = () => {
    // Using a function to update the count based on the previous value
    setCount((prevCount) => prevCount - 1);
  };

  const resetCount = () => {
    // Directly setting the count to zero
    setCount(0); // No function here, just a value
  };

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={incrementCount}>Increment</button>
      <button onClick={decrementCount}>Decrement</button>
      <button onClick={resetCount}>Reset</button>
    </div>
  );
};

export default LocalStorageExample;
