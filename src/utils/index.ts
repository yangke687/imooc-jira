import { useState, useEffect } from "react";

export const cleanObj = (obj: object) => {
  const _obj = { ...obj };

  Object.keys(_obj).forEach((key) => {
    // @ts-ignore
    const value = _obj[key];

    if (isFalsy(value)) {
      // @ts-ignore
      delete _obj[key];
    }
  });

  return _obj;
};

export const isFalsy = (value: any) => (value === 0 ? false : !value);

// prettier-ignore
// eslint-disable-next-line react-hooks/exhaustive-deps
export const useMount = (callback: () => void) => useEffect(() => callback(), []);

export const useDebounce = (value: any, delay?: number) => {
  const [param, setParam] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setParam(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return param;
};
