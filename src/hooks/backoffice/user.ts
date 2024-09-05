import { fetchAllUser } from "@/api/endpoints/user";
import { QueryTables } from "@/types";
import { useState } from "react";
import useSWR from "swr";

export function useAllUser() {
  const [queries, setQueries] = useState<QueryTables>({
    page: 1,
    limit: "",
    q: "",
    CompanyId: "",
    GroupId: "",
    BranchId: "",
  });
  const { data, isLoading, mutate } = useSWR(
    `/backoffice/user?page=${queries.page}${
      queries.limit ? `&limit=${queries.limit}` : ""
    }&q=${queries.q}${
      queries.CompanyId ? `&CompanyId=${queries.CompanyId}` : ""
    }${queries.GroupId ? `&GroupId=${queries.GroupId}` : ""}${
      queries.BranchId ? `&BranchId=${queries.BranchId}` : ""
    }`,
    (url: string) => fetchAllUser(url),
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
    queries: queries,
    setQueries: setQueries,
  };
}
