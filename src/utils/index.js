import { useState, useEffect } from "react";

export const cleanObj = (obj) => {
  const _obj = { ...obj };

  Object.keys(_obj).forEach((key) => {
    const value = _obj[key];

    if (isFalsy(value)) {
      delete _obj[key];
    }
  });

  return _obj;
};

export const isFalsy = (value) => (value === 0 ? false : !value);

export const useMount = (callback) => useEffect(() => callback(), []);

export const useDebounce = (value, delay) => {
  const [param, setParam] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setParam(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return param;
};
