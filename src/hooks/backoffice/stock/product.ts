import { fetchAllProducts } from "@/api/endpoints/stock/product";
import { fetchAllFlowContingency } from "@/api/endpoints/treasury/central/flow/contingency";
import { QueryTables } from "@/types";
import { useState } from "react";
import useSWR from "swr";

export function useAllProduct() {
  const [queries, setQueries] = useState<QueryTables>({
    page: 1,
    limit: "",
    q: "",
    CompanyId: "",
    GroupId: "",
    BranchId: "",
  });
  const { data, isLoading, mutate } = useSWR(
    `/backoffice/stock/product?page=${queries.page}&limit=${queries.limit}&q=${
      queries.q
    }${queries.CompanyId ? `&CompanyId=${queries.CompanyId}` : ""}${
      queries.GroupId ? `&GroupId=${queries.GroupId}` : ""
    }${queries.BranchId ? `&BranchId=${queries.BranchId}` : ""}`,
    (url: string) => fetchAllProducts(url),
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
