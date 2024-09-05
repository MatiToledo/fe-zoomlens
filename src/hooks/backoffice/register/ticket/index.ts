import { fetchAllRegisterTicket } from "@/api/endpoints/register/ticket";
import { QueryTables } from "@/types";
import { useState } from "react";
import useSWR from "swr";

export function useAllRegisterTicket() {
  const [queries, setQueries] = useState<QueryTables>({
    page: 1,
    limit: "",
    q: "",
    CompanyId: "",
    GroupId: "",
    BranchId: "",
  });

  const { data, isLoading, mutate } = useSWR(
    `/backoffice/register/ticket?page=${queries.page}&q=${queries.q}${
      queries.limit ? `&limit=${queries.limit}` : ""
    }${queries.CompanyId ? `&CompanyId=${queries.CompanyId}` : ""}${
      queries.GroupId ? `&GroupId=${queries.GroupId}` : ""
    }${queries.BranchId ? `&BranchId=${queries.BranchId}` : ""}
    `,
    (url: string) => fetchAllRegisterTicket(url),
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
    queries: queries,
    setQueries: setQueries,
    mutate,
  };
}
