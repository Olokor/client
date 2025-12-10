import { useEffect, useState } from "react";
import { SendApiRequest } from "../component/forms/SendApiRequest";
import { UseFetchReturn } from "../types";

export default function useFetch<T = any>(endpoint: string): UseFetchReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await SendApiRequest<any>(endpoint, "GET");
        setData(response.data || response);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [endpoint]);

  return { data, loading, error };
}
