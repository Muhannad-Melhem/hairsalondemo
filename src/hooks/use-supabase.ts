"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export function useSupabaseQuery<T>(
  table: string,
  query?: { eq?: [string, string]; order?: [string, boolean] },
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const supabase = createClient();
        let req = supabase.from(table).select("*");
        if (query?.eq) req = req.eq(query.eq[0], query.eq[1]);
        if (query?.order) req = req.order(query.order[0], { ascending: query.order[1] });
        const { data, error } = await req;
        if (error) throw error;
        setData(data as T[]);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [table]);

  return { data, loading, error };
}
