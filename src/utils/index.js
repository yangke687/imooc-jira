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
