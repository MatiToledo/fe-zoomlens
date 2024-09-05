import { fetchAllGroup, fetchAllGroupsByCompany } from "@/api/endpoints/group";
import { QueryTables, SelectOption } from "@/types";
import { useEffect, useState } from "react";
import useSWR from "swr";
export function useGetAllGroupsByCompany(CompanyId: string | undefined) {
  const [groups, setGroups] = useState<SelectOption[]>([]);
  useEffect(() => {
    if (CompanyId === undefined) return;
    async function getGroups() {
      const groups = await fetchAllGroupsByCompany(
        `/backoffice/group/company/${CompanyId}`
      );
      setGroups(
        groups.map((group) => ({ label: group.name, value: group.id }))
      );
    }
    getGroups();
    return () => {
      setGroups([]);
    };
  }, [CompanyId]);

  return groups;
}

export function useAllGroup() {
  const [queries, setQueries] = useState<QueryTables>({
    page: 1,
    limit: "",
    q: "",
    CompanyId: "",
  });
  const { data, isLoading, mutate } = useSWR(
    `/backoffice/group?page=${queries.page}${
      queries.limit ? `&limit=${queries.limit}` : ""
    }&q=${queries.q}${
      queries.CompanyId ? `&CompanyId=${queries.CompanyId}` : ""
    }`,
    (url: string) => fetchAllGroup(url),
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
