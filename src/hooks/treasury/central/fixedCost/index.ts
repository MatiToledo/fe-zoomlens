import { fetchFixedCostByBranchAndPeriod } from "@/api/endpoints/treasury/central/fixedCost";
import { CalendarDate } from "@nextui-org/react";
import { useEffect, useState } from "react";
import useSWR from "swr";

export function useGetFixedCost(BranchId: string, date: CalendarDate) {
  const [fixedCost, setFixedCost] = useState<any>();

  const { data, isLoading, mutate } = useSWR(
    `/fixedCost/branch/${BranchId}?year=${date.year}&month=${date.month}`,
    (url: string) => fetchFixedCostByBranchAndPeriod(url),
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
    }
  );

  useEffect(() => {
    if (data) {
      setFixedCost(data);
    }
  }, [data]);

  return {
    data: data || undefined,
    isLoading,
    mutate,
  };
}
