import { fetchAllPostnetMPByBranch } from "@/api/endpoints/treasury/central/postnet/mp";
import { PostnetBank } from "@/types/models";
import { CalendarDate } from "@nextui-org/react";
import { UUID } from "crypto";
import { useEffect, useState } from "react";
import useSWR from "swr";

export function useAllTreasuryCentralPostnetMP(
  BranchId: UUID,
  date: { start: CalendarDate; end: CalendarDate }
) {
  const [movements, setMovements] = useState<PostnetBank[]>([]);

  const { data, isLoading, mutate } = useSWR(
    `/treasury/central/postnet/mp/branch/${BranchId}?startDate=${date.start}&endDate=${date.end}`,
    (url: string) => fetchAllPostnetMPByBranch(url),
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
