import { useState, useEffect, useRef } from "react";
import axios from "axios";

// Custom hook to manage API calls
const useApi = (baseUrl) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const abortController = useRef(new AbortController());

  // Function to handle API calls
  const ApiCall = async (method, requestData = {}, options = {}) => {
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
        ...options,
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
    GetData: (options = {}) => ApiCall("GET", {}, options),
    GetDataById: (id, options = {}) =>
      ApiCall("GET", {}, { ...options, url: `${baseUrl}/${id}` }),
    PostData: (requestData, options = {}) =>
      ApiCall("POST", requestData, options),
    PutData: (id, requestData, options = {}) =>
      ApiCall("PUT", requestData, { ...options, url: `${baseUrl}/${id}` }),
    DeleteData: (id, options = {}) =>
      ApiCall("DELETE", {}, { ...options, url: `${baseUrl}/${id}` }),
    PatchData: (id, requestData, options = {}) =>
      ApiCall("PATCH", requestData, { ...options, url: `${baseUrl}/${id}` }),
  };
};

export default useApi;
