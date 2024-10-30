import { fetchApiGet, fetchApiPost, fetchApiPut } from "@/api/config";
import { StockRegisterBar } from "@/types/models";

export async function fetchStockRegisterBarsByBranchIdAndDateIncludedProducts(
  url: string
) {
  const res = await fetchApiGet(url);
  return res.data;
}
export async function fetchStockRegisterBarsByBranchIdAndDate(url: string) {
  const res = await fetchApiGet(url);
  return res.data;
}

export async function fetchCheckIfCanEdit(url: string) {
  const res = await fetchApiGet(url);
  return res.data;
}

export async function fetchBulkCreateStockRegisterBar(body: {
  items: Partial<StockRegisterBar>[];
}): Promise<StockRegisterBar[]> {
  const res = await fetchApiPost("/stock/registerBar/bulk", body);
  return res.data;
}
export async function fetchBulkUpdateStockRegisterBar(body: {
  items: Partial<StockRegisterBar>[];
}): Promise<StockRegisterBar[]> {
  const res = await fetchApiPut("/stock/registerBar/bulk", body);
  return res.data;
}
