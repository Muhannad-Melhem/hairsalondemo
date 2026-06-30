"use client";

import { useState, useEffect, useCallback } from "react";
import { api as apiClient } from "@/lib/api-client";

type QueryResult<T> = {
  data: T[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
};

/**
 * Generic hook for fetching list data from admin API routes.
 * Replaces useSupabaseQuery.
 *
 * @param endpoint - API endpoint path (e.g., "/api/admin/services")
 * @param key - response key that contains the array (e.g., "services")
 */
export function useApiQuery<T>(
  endpoint: string,
  key: string,
): QueryResult<T> {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiClient.get<Record<string, T[]>>(endpoint);
      setData(result[key] ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, [endpoint, key]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

type SingleResult<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

/**
 * Hook for fetching a single item from admin API routes.
 */
export function useApiGet<T>(endpoint: string, key: string): SingleResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await apiClient.get<Record<string, T>>(endpoint);
        setData(result[key] ?? null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [endpoint, key]);

  return { data, loading, error };
}
