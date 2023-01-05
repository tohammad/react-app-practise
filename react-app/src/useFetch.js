import { useEffect, useDebugValue, useState } from "react";

const useFetch = (url) => {
  useDebugValue(url);
  const [response, setResponse] = useState([]);
  const [error, setError] = useState(null);
  const [httpResponse, setHttpResponse] = useState();
  useDebugValue(
    httpResponse ? "status code " + httpResponse.status : "no response"
  );
  useDebugValue(error, (e) =>
    e ? `fetch failed due to ${e.message}` : "fetch successful"
  );
  useEffect(() => {
    async function fetchFiles() {
      try {
        const response = await fetch(url);
        setHttpResponse(response);
        const json = await response.json();
        setResponse(json);
      } catch (error) {
        setError(error);
      }
    }
    fetchFiles();
  }, [setError, setResponse, url]);
  useDebugValue(response, (users) =>
    users.length > 0 ? users.map((user) => user.name) : "no users loaded"
  );
  return [response, error];
};

export default useFetch;
