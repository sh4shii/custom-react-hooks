import { useEffect, useState } from "react";

function useLocalStorage(key, defaultValue) {
  // Function to get the value from local storage or return the initial value
  const getStoredValue = () => {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue; 
  };

  // State to hold the current value from local storage
  const [value, setValue] = useState(getStoredValue);

  useEffect(() => {
    // Handler to update state when local storage changes
    const handler = (e) => {
      if (e.key === key) {
        const newValue = e.newValue ? JSON.parse(e.newValue) : defaultValue;
        setValue(newValue);
      }
    };

    window.addEventListener("storage", handler); // Listen for storage events

    return () => {
      window.removeEventListener("storage", handler); // Cleanup listener on unmount
    };
  }, [key, defaultValue]);

  const setValueWrap = (newValue) => {
    try {
      // Determine the value to store (supporting functional updates)
      const valueToStore =
        newValue instanceof Function ? newValue(value) : newValue;
      setValue(valueToStore); // Update state
      localStorage.setItem(key, JSON.stringify(valueToStore)); // Save to local storage

      // Dispatch a storage event to synchronize across tabs/windows
      window.dispatchEvent(
        new StorageEvent("storage", {
          key,
          newValue: JSON.stringify(valueToStore),
        })
      );
    } catch (error) {
      console.error(error); // Log errors if any occur
    }
  };

  return [value, setValueWrap]; // Return the state and updater function
}

export default useLocalStorage;
