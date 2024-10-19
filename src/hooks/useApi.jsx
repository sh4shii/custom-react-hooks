import { useState, useEffect } from "react";
import axios from "axios";

const useApi = (baseUrl) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const ApiCall = async (method, requestData = {}, options = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios({
        method,
        url: baseUrl,
        data: requestData,
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

  useEffect(() => {
    const source = axios.CancelToken.source();
    ApiCall("GET", {}, { cancelToken: source.token });
    return () => {
      source.cancel("Operation canceled by the user.");
    };
  }, [baseUrl]);

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
