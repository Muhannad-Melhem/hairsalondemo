"use client";

import { useState, useEffect } from "react";
import { api as apiClient } from "@/lib/api-client";

type QueryResult<T> = {
  data: T[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
};

export function useApiQuery<T>(
  endpoint: string,
  key: string,
): QueryResult<T> {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = () => {
    apiClient.get<Record<string, T[]>>(endpoint)
      .then((result) => setData(result[key] ?? []))
      .catch((err) => setError(err instanceof Error ? err.message : "An error occurred"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint, key]);

  return { data, loading, error, refetch: fetchData };
}

type SingleResult<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

export function useApiGet<T>(endpoint: string, key: string): SingleResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItem = () => {
    apiClient.get<Record<string, T>>(endpoint)
      .then((result) => setData(result[key] ?? null))
      .catch((err) => setError(err instanceof Error ? err.message : "An error occurred"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchItem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint, key]);

  return { data, loading, error };
}
