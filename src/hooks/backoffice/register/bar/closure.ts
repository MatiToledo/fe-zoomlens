import { fetchAllRegisterBarClosure } from "@/api/endpoints/register/bar/closure";
import { QueryTables } from "@/types";
import { CalendarDate } from "@internationalized/date";
import { useState } from "react";
import useSWR from "swr";

export function useAllRegisterBarClosure(date: {
  start: CalendarDate;
  end: CalendarDate;
}) {
  const [queries, setQueries] = useState<QueryTables>({
    page: 1,
    limit: "",
    q: "",
    CompanyId: "",
    GroupId: "",
    BranchId: "",
  });

  const { data, isLoading, mutate } = useSWR(
    `/backoffice/register/bar/closure?page=${queries.page}&q=${queries.q}${
      queries.limit ? `&limit=${queries.limit}` : ""
    }${queries.CompanyId ? `&CompanyId=${queries.CompanyId}` : ""}${
      queries.GroupId ? `&GroupId=${queries.GroupId}` : ""
    }${queries.BranchId ? `&BranchId=${queries.BranchId}` : ""}&startDate=${
      date.start
    }&endDate=${date.end}`,
    (url: string) => fetchAllRegisterBarClosure(url),
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
