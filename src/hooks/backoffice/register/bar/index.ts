import { fetchAllRegisterBar } from "@/api/endpoints/register/bar";
import { QueryTables } from "@/types";
import { CalendarDate } from "@nextui-org/react";
import { useState } from "react";
import useSWR from "swr";

export function useAllRegisterBar() {
  const [queries, setQueries] = useState<QueryTables>({
    page: 1,
    limit: "",
    q: "",
    CompanyId: "",
    GroupId: "",
    BranchId: "",
  });

  const { data, isLoading, mutate } = useSWR(
    `/backoffice/register/bar?page=${queries.page}&q=${queries.q}${
      queries.limit ? `&limit=${queries.limit}` : ""
    }${queries.CompanyId ? `&CompanyId=${queries.CompanyId}` : ""}${
      queries.GroupId ? `&GroupId=${queries.GroupId}` : ""
    }${queries.BranchId ? `&BranchId=${queries.BranchId}` : ""}
    `,
    (url: string) => fetchAllRegisterBar(url),
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
