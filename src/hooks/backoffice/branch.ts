import {
  fetchAllBranch,
  fetchAllBranchesByGroup,
} from "@/api/endpoints/branch";
import { QueryTables, SelectOption } from "@/types";
import { useEffect, useState } from "react";
import useSWR from "swr";

export function useGetAllBranchesByGroup(GroupId: string | undefined) {
  const [branches, setBranches] = useState<SelectOption[]>([]);

  useEffect(() => {
    if (GroupId === undefined) return;
    async function getBranches() {
      const branches = await fetchAllBranchesByGroup(
        `/backoffice/branch/group/${GroupId}`
      );
      setBranches(
        branches.map((branch) => ({
          label: branch.name,
          value: branch.id,
        }))
      );
    }
    getBranches();
    return () => {
      setBranches([]);
    };
  }, [GroupId]);

  return branches;
}

export function useAllBranch() {
  const [queries, setQueries] = useState<QueryTables>({
    page: 1,
    limit: "",
    q: "",
    CompanyId: "",
    GroupId: "",
  });
  const { data, isLoading, mutate } = useSWR(
    `/backoffice/branch?page=${queries.page}${
      queries.limit ? `&limit=${queries.limit}` : ""
    }&q=${queries.q}${
      queries.CompanyId ? `&CompanyId=${queries.CompanyId}` : ""
    }${queries.GroupId ? `&GroupId=${queries.GroupId}` : ""}`,
    (url: string) => fetchAllBranch(url),
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
