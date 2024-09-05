import {
  fetchAllRegisterMP,
  fetchAllRegisterMPByBranch,
} from "@/api/endpoints/treasury/central/register/mp";
import { RegisterCash } from "@/types/models";
import { CalendarDate } from "@nextui-org/react";
import { UUID } from "crypto";
import { useEffect, useState } from "react";
import useSWR from "swr";

export interface TreasuryCentralQuery {
  startDate?: string;
  endDate?: string;
}
export function useAllTreasuryCentralRegisterMP(
  BranchId: UUID,
  date: { start: CalendarDate; end: CalendarDate }
) {
  const [movements, setMovements] = useState<RegisterCash[]>([]);

  const { data, isLoading, mutate } = useSWR(
    `/treasury/central/register/MP/branch/${BranchId}?startDate=${date.start}&endDate=${date.end}`,
    (url: string) => fetchAllRegisterMPByBranch(url),
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
