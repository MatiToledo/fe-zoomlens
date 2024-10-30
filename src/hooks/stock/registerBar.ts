import {
  fetchCheckIfCanEdit,
  fetchStockRegisterBarsByBranchIdAndDate,
  fetchStockRegisterBarsByBranchIdAndDateIncludedProducts,
} from "@/api/endpoints/stock/registerBar";
import { StockRegisterBar } from "@/types/models";
import { CalendarDate } from "@nextui-org/react";
import { UUID } from "crypto";
import { useEffect, useState } from "react";
import useSWR from "swr";

export function useAllStockRegisterBarByRegisterIdIncludedProducts(
  RegisterBarId: UUID | null,
  date: CalendarDate
) {
  const [stockRegisterBar, setStockRegisterBar] = useState<
    {
      id: UUID | null;
      ProductName: string;
      ProductId: UUID;
      initial: number;
      canEdit: boolean;
    }[]
  >([]);

  // Solo hacer fetch si RegisterBarId no es null
  const { data, isLoading, mutate } = useSWR(
    RegisterBarId
      ? `/stock/registerBar/product/branch/${RegisterBarId}?date=${date.year}-${date.month}-${date.day}`
      : null,
    (url: string) =>
      fetchStockRegisterBarsByBranchIdAndDateIncludedProducts(url)
  );

  useEffect(() => {
    setStockRegisterBar(data || []);
  }, [data]);

  return {
    stockRegisterBar,
    setStockRegisterBar,
    isLoading,
    mutate,
  };
}
export function useAllStockRegisterBarByRegisterId(
  RegisterBarId: UUID | null,
  date: CalendarDate
) {
  const [stockRegisterBar, setStockRegisterBar] = useState<StockRegisterBar[]>(
    []
  );

  // Solo hacer fetch si RegisterBarId no es null
  const { data, isLoading, mutate } = useSWR(
    RegisterBarId
      ? `/stock/registerBar/${RegisterBarId}?date=${date.year}-${date.month}-${date.day}`
      : null,
    (url: string) => fetchStockRegisterBarsByBranchIdAndDate(url)
  );

  useEffect(() => {
    setStockRegisterBar(data || []);
  }, [data]);

  return {
    stockRegisterBar,
    setStockRegisterBar,
    isLoading,
    mutate,
  };
}
