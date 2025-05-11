export const setToLocalStorage = (key, token) => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  localStorage.setItem(key, token);
};

export const removeFromLocalStorage = (key) => {
  if (!key || typeof window === "undefined") {
    return;
  }
  localStorage.removeItem(key);
};

export const getFromLocalStorage = (key) => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  return localStorage.getItem(key);
};
