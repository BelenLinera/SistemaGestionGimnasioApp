import { useCallback, useState } from "react";
import api from "../api";

export const UseAxiosLoader = () => {
  const [loading, setLoading] = useState(false);

  const sendRequest = useCallback(async (config) => {
    // console.log("config", config);
    setLoading(true);
    console.log("hola");
    try {
      console.log("request config:", config);
      const response = await api(config);
      //   console.log("response", response);
      //   setTimeout(() => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
      //   }, 3000);
      return response;
    } catch (error) {
      console.log("Request error:", error);
      setLoading(false);
      throw error;
    }
  }, []);

  return { loading, sendRequest };
};
