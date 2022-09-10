import { useState, useEffect, useRef } from "react";

export const cleanObj = (obj: { [key: string]: unknown }) => {
  const _obj = { ...obj };

  Object.keys(_obj).forEach((key) => {
    const value = _obj[key];

    if (isVoid(value)) {
      delete _obj[key];
    }
  });

  return _obj;
};

export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";

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

export const useDocumentTitle = (title: string, keepOnUnmount = true) => {
  const oldTitle = useRef(document.title).current;

  // console.log("rendering:", oldTitle);

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        // console.log("unmount:", oldTitle);
        document.title = oldTitle;
      }
    };
  }, [keepOnUnmount, oldTitle]);
};

export const resetRoute = () => {
  window.location.href = window.location.origin;
};
