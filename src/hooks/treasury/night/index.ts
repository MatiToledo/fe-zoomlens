import { fetchTreasuryNightResume } from "@/api/endpoints/treasury/night";
import { CalendarDate } from "@nextui-org/react";
import { useEffect, useState } from "react";
import useSWR from "swr";

export default function useGetTreasuryNightResume(
  BranchId: string,
  date: CalendarDate
) {
  const queryDate = `${date.year}-${date.month}-${date.day}`;
  // const [movements, setMovements] = useState();

  const { data, isLoading, mutate } = useSWR(
    `/treasury/night/resume/branch/${BranchId}?date=${queryDate}`,
    (url: string) => fetchTreasuryNightResume(url),
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
    }
  );

  // useEffect(() => {
  //   if (data) {
  //     setMovements(data);
  //   }
  // }, []);

  return {
    data: data || undefined,
    isLoading,
    mutate,
  };
}
