import { fetchAllAdmin } from "@/api/endpoints/user";
import { QueryTables } from "@/types";
import { useState } from "react";
import useSWR from "swr";

export function useAllAdmin() {
  const [queries, setQueries] = useState<QueryTables>({
    page: 1,
    limit: "",
    q: "",
    role: "",
  });
  const { data, isLoading, error, mutate } = useSWR(
    `/backoffice/user/admin?page=${queries.page}${
      queries.limit ? `&limit=${queries.limit}` : ""
    }&q=${queries.q}${queries.role ? `&role=${queries.role}` : ""}`,
    (url: string) => fetchAllAdmin(url),
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    rows: data?.rows || [],
    count: data?.count || 0,
    mutate,
    isLoading,
    isError: error,
    queries: queries,
    setQueries: setQueries,
  };
}
