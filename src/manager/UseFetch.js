import { useEffect, useState } from "react";
import { SendApiRequest } from "../component/forms/SendApiRequest";

export default function useFetch(endpoint) {
  const [data, setData] = useState(null);  // store result
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await SendApiRequest(endpoint, "GET");
        setData(response.data || response);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [endpoint]);

  return { data, loading, error };
}
