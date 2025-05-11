"use client"; // Ensures this hook runs on the client side

import axios from "axios";
import { useEffect, useState } from "react";

export default function useGetDat(url, apiKey) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // To prevent state updates on unmounted components

    const fetchData = async () => {
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        });

        if (isMounted && response?.data) {
          setData(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error.response || error.message);
        if (isMounted) {
          setError("Failed to load data. Please try again later.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false; // Cleanup to avoid memory leaks
    };
  }, [url, apiKey]); // Added 'apiKey' as a dependency to avoid issues with changing keys

  return { data, loading, error };
}
