import { fetchAllStockCentrals } from "@/api/endpoints/stock/central";
import { fetchAllProducts } from "@/api/endpoints/stock/product";
import { fetchAllFlowContingency } from "@/api/endpoints/treasury/central/flow/contingency";
import { QueryTables } from "@/types";
import { useState } from "react";
import useSWR from "swr";

export function useAllStockCentral() {
  const [queries, setQueries] = useState<QueryTables>({
    page: 1,
    limit: "",
    q: "",
    month: "",
    week: "",
    CompanyId: "",
    GroupId: "",
    BranchId: "",
  });
  const { data, isLoading, mutate } = useSWR(
    `/backoffice/stock/central?page=${queries.page}&limit=${queries.limit}&q=${
      queries.q
    }${queries.CompanyId ? `&CompanyId=${queries.CompanyId}` : ""}${
      queries.GroupId ? `&GroupId=${queries.GroupId}` : ""
    }${queries.BranchId ? `&BranchId=${queries.BranchId}` : ""}${
      queries.month ? `&month=${queries.month}` : ""
    }${queries.week ? `&week=${queries.week}` : ""}`,
    (url: string) => fetchAllStockCentrals(url),
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
