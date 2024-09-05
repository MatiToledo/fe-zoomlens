import { fetchAllConcept } from "@/api/endpoints/concept";
import { QueryTables } from "@/types";
import { useState } from "react";
import useSWR from "swr";

export function useAllConcept() {
  const [queries, setQueries] = useState<QueryTables>({
    page: 1,
    limit: "",
    q: "",
    level: "",
  });

  const { data, isLoading, mutate } = useSWR(
    () => {
      return `/backoffice/concept?page=${queries.page}${
        queries.limit ? `&limit=${queries.limit}` : ""
      }&q=${queries.q}${queries.level ? `&level=${queries.level}` : ""}`;
    },
    fetchAllConcept,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    rows: data?.rows || [],
    count: data?.count || 0,
    isLoading,
    mutate,
    queries: queries,
    setQueries: setQueries,
  };
}
