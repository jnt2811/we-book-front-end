export const localGet = (key, fallback) => {
  return localStorage.getItem(key) !== "undefined" &&
    localStorage.getItem(key) !== "null"
    ? JSON.parse(localStorage.getItem(key))
    : fallback;
};

export const localSet = (key, val) => {
  return localStorage.setItem(key, JSON.stringify(val));
};
