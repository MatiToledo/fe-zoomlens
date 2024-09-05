import { fetchAllCompany } from "@/api/endpoints/company";
import { QueryTables, SelectOption } from "@/types";
import { useState, useEffect } from "react";
import useSWR from "swr";

export function useGetAllCompanies() {
  const [companies, setCompanies] = useState<SelectOption[]>([]);
  useEffect(() => {
    async function getCompanies() {
      const companies = await fetchAllCompany(`/backoffice/company`);
      setCompanies(
        companies.rows.map((company) => ({
          label: company.name,
          value: company.id,
        }))
      );
    }
    getCompanies();
    return () => {
      setCompanies([]);
    };
  }, []);

  return companies;
}

export function useAllCompany() {
  const [queries, setQueries] = useState<QueryTables>({
    page: 1,
    limit: "",
    q: "",
  });
  const { data, isLoading, mutate } = useSWR(
    `/backoffice/company?page=${queries.page}${
      queries.limit ? `&limit=${queries.limit}` : ""
    }&q=${queries.q}`,
    (url: string) => fetchAllCompany(url),
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
