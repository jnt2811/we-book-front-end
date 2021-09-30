export const localGet = (key, fallback) => {
  return localStorage.getItem(key) !== "undefined"
    ? JSON.parse(localStorage.getItem(key))
    : fallback;
};

export const localSet = (key, val) => {
  return localStorage.setItem(key, JSON.stringify(val));
};
