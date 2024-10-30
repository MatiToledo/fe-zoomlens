import { fetchApiPost } from "@/api/config";

export async function fetchCreateStockRegisterBarClosure(body: any) {
  const res = await fetchApiPost("/stock/registerBar/closure", body);
  return res.data;
}
