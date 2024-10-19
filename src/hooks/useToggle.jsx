import { useState } from 'react';

const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);

  const toggle = (newValue) => {
    if (typeof newValue === 'boolean') {
      setValue(newValue);
    } else {
      setValue((prevValue) => !prevValue);
    }
  };

  return [value, toggle, setValue];
};

export default useToggle;
