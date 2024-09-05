import { fetchAllExpense } from "@/api/endpoints/treasury/night/expense";
import { QueryTables } from "@/types";
import { CalendarDate } from "@nextui-org/react";
import { useState } from "react";
import useSWR from "swr";

export function useAllExpense(date: {
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
    `/backoffice/treasury/night/expense?page=${queries.page}&limit=${
      queries.limit
    }&q=${queries.q}${
      queries.CompanyId ? `&CompanyId=${queries.CompanyId}` : ""
    }${queries.GroupId ? `&GroupId=${queries.GroupId}` : ""}${
      queries.BranchId ? `&BranchId=${queries.BranchId}` : ""
    }&startDate=${date.start}&endDate=${date.end}`,
    (url: string) => fetchAllExpense(url),
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
