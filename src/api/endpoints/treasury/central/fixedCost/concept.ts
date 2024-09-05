import { fetchApiPost } from "@/api/config";
import { FixedCostConcept } from "@/types/models";

export async function fetchBulkCreateFixedCostConcept(body: {
  items: Partial<FixedCostConcept>[];
}): Promise<FixedCostConcept[]> {
  const res = await fetchApiPost("/fixedCost/concept/bulk", body);
  return res.data;
}
