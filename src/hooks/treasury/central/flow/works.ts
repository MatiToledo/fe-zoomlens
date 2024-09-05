import { fetchAllFlowContingencyByBranch } from "@/api/endpoints/treasury/central/flow/contingency";
import { fetchAllFlowWorksByBranch } from "@/api/endpoints/treasury/central/flow/works";
import { FlowContingency, FlowWorks } from "@/types/models";
import { CalendarDate } from "@nextui-org/react";
import { UUID } from "crypto";
import { useEffect, useState } from "react";
import useSWR from "swr";

export function useAllFlowWorks(
  BranchId: UUID,
  date: { start: CalendarDate; end: CalendarDate }
) {
  const [movements, setMovements] = useState<FlowWorks[]>([]);

  const { data, isLoading, mutate } = useSWR(
    `/treasury/central/flow/works/branch/${BranchId}?startDate=${date.start}&endDate=${date.end}`,
    (url: string) => fetchAllFlowWorksByBranch(url),
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
    }
  );

  useEffect(() => {
    setMovements(data || []);
  }, [data]);

  return {
    movements,
    setMovements,
    isLoading,
    mutate,
  };
}
