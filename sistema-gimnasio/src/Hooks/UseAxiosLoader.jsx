import { useCallback, useState } from "react";
import api from "../api";

export const UseAxiosLoader = () => {
  const [loading, setLoading] = useState(false);

  const sendRequest = useCallback(async (config) => {
    setLoading(true);
    try {
      const response = await api(config);
      await new Promise((resolve) => setTimeout(resolve, 500));
      setLoading(false);
      return response;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  }, []);

  return { loading, sendRequest };
};
