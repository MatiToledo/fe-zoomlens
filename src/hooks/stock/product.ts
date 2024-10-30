import { fetchProductsByBranchId } from "@/api/endpoints/stock/product";
import { Product } from "@/types/models";
import { UUID } from "crypto";
import { useEffect, useState } from "react";
import useSWR from "swr";

export function useAllProductsByBranchId(BranchId: UUID) {
  const [products, setProducts] = useState<Product[]>([]);

  const { data, isLoading, mutate } = useSWR(
    `/stock/product/branch/${BranchId}`,
    (url: string) => fetchProductsByBranchId(url)
  );

  useEffect(() => {
    setProducts(data || []);
  }, [data]);

  return {
    products,
    setProducts,
    isLoading,
    mutate,
  };
}
