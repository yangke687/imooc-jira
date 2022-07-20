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

export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

// prettier-ignore
// eslint-disable-next-line react-hooks/exhaustive-deps
export const useMount = (callback: () => void) => useEffect(() => callback(), []);

export const useDebounce: <T>(arg0: T, arg1?: number) => T = (
  value,
  delay?: number
) => {
  const [param, setParam] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setParam(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return param;
};

export const useArray = <T>(_arr: T[]) => {
  const [arr, setArr] = useState(_arr);

  const clear = () => setArr([]);

  const removeIndex = (idx: number) => {
    setArr(arr.filter((item, _idx) => _idx !== idx));
  };

  const add = (item: T) => {
    setArr([...arr, item]);
  };

  return {
    value: arr,
    clear,
    removeIndex,
    add,
  };
};
