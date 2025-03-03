"use client";

import { useState, useEffect } from "react";

const useCookie = (cookieName) => {
  const [cookieObject, setCookieObject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const cookies = document.cookie.split(";");
      let value = null;
      for (let cookie of cookies) {
        const [key, val] = cookie.trim().split("=");
        if (key === cookieName) {
          try {
            // Try to parse the cookie's value as JSON.
            value = JSON.parse(decodeURIComponent(val));
          } catch (error) {
            console.error("Error parsing JSON from cookie:", error);
          }
          break;
        }
      }
      setCookieObject(value);
    }
    setLoading(false);
  }, [cookieName]);

  return [cookieObject, loading];
};

export default useCookie;
