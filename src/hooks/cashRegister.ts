import { fetchCashRegisterMovements } from "@/api/endpoints/cashRegister";
import { CalendarDate } from "@nextui-org/react";
import useSWR from "swr";

export function useGetCashRegisterMovements(
  BranchId: string,
  date: CalendarDate
) {
  const queryDate = `${date.year}-${date.month}-${date.day}`;

  const { data, isLoading, mutate } = useSWR(
    `/cashRegister/movements?BranchId=${BranchId}&date=${queryDate}`,
    (url: string) => fetchCashRegisterMovements(url),
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    data: data || undefined,
    isLoading,
    mutate,
  };
}
