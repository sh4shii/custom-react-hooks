import React, { useState } from "react";
import useDebounce from "../hooks/useDebounce";

const DebounceExample = () => {
  const [inputValue, setInputValue] = useState("");
  const debouncedValue = useDebounce(inputValue, 500); // 500ms debounce

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };
  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Search..."
      />
      <p>Debounced Value: {debouncedValue}</p>{" "}
      {/* Display the debounced value */}
    </div>
  );
};

export default DebounceExample;
