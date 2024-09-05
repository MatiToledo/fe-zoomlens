import { fetchAllFlowContingencyByBranch } from "@/api/endpoints/treasury/central/flow/contingency";
import { FlowContingency, FlowFixedCost } from "@/types/models";
import { CalendarDate } from "@nextui-org/react";
import { UUID } from "crypto";
import { useEffect, useState } from "react";
import useSWR from "swr";

export function useAllFlowFixedCost(
  BranchId: UUID,
  date: { start: CalendarDate; end: CalendarDate }
) {
  const [movements, setMovements] = useState<FlowFixedCost[]>([]);

  const { data, isLoading, mutate } = useSWR(
    `/treasury/central/flow/fixedCost/branch/${BranchId}?startDate=${date.start}&endDate=${date.end}`,
    (url: string) => fetchAllFlowContingencyByBranch(url),
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
