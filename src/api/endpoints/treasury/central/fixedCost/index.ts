import { fetchApiGet, fetchApiPut } from "@/api/config";
import { UUID } from "crypto";
export async function fetchFixedCostByBranchAndPeriod(
  url: string
): Promise<any> {
  const res = await fetchApiGet(url);
  return res.data;
}

export async function fetchUpdateFixedCost(id: UUID, data: any): Promise<any> {
  const res = await fetchApiPut(`/fixedCost/${id}`, data);
  return res.data;
}
