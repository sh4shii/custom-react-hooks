import { useState, useEffect, useRef } from "react";
import axios from "axios";

// Custom hook to manage API calls
const useApi = (baseUrl) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const abortController = useRef(new AbortController());

  // Function to handle API calls
  const ApiCall = async (method, requestData = {}, config = {}) => {
    setLoading(true);
    setError(null);

    // Cancel the previous request
    abortController.current.abort();
    abortController.current = new AbortController(); // Create a new instance for the next request

    try {
      const response = await axios({
        method,
        url: baseUrl,
        data: requestData,
        signal: abortController.current.signal, // Attach the signal for cancellation
        ...config,
      });
      setData(response.data);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleError = (err) => {
    if (axios.isAxiosError(err)) {
      setError(
        err.response
          ? new Error(`${err.response.status} - ${err.response.data}`)
          : new Error("No response received from server")
      );
    } else {
      setError(new Error("Something went wrong"));
    }
  };

  // Cleanup function to abort requests when the component unmounts
  useEffect(() => {
    return () => {
      abortController.current.abort();
    };
  }, []);

  return {
    data,
    loading,
    error,
    GetData: (config = {}) => ApiCall("GET", {}, config),
    GetDataById: (id, config = {}) =>
      ApiCall("GET", {}, { ...config, url: `${baseUrl}/${id}` }),
    PostData: (requestData, config = {}) =>
      ApiCall("POST", requestData, config),
    PutData: (id, requestData, config = {}) =>
      ApiCall("PUT", requestData, { ...config, url: `${baseUrl}/${id}` }),
    DeleteData: (id, config = {}) =>
      ApiCall("DELETE", {}, { ...config, url: `${baseUrl}/${id}` }),
    PatchData: (id, requestData, config = {}) =>
      ApiCall("PATCH", requestData, { ...config, url: `${baseUrl}/${id}` }),
  };
};

export default useApi;
