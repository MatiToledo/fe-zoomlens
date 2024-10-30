import { fetchStockCentralsByBranchIdAndDateIncludedProducts } from "@/api/endpoints/stock/central";
import getWeekOfMonth from "@/utils/getWeekOfMonth";
import { CalendarDate } from "@nextui-org/react";
import { UUID } from "crypto";
import { useEffect, useState } from "react";
import useSWR from "swr";

export function useAllStockCentralByBranchIdIncludedProducts(
  BranchId: UUID,
  date: CalendarDate
) {
  const [stockCentral, setStockCentral] = useState<
    { id: UUID | null; ProductName: string; ProductId: UUID; initial: number }[]
  >([]);

  const month = date.month;
  const week = getWeekOfMonth(date);

  const { data, isLoading, mutate } = useSWR(
    `/stock/central/product/branch/${BranchId}?month=${month}&week=${week}`,
    (url: string) => fetchStockCentralsByBranchIdAndDateIncludedProducts(url)
  );

  useEffect(() => {
    setStockCentral(data || []);
  }, [data]);

  return {
    stockCentral,
    setStockCentral,
    isLoading,
    mutate,
  };
}
