import {
  fetchApiDelete,
  fetchApiGet,
  fetchApiPost,
  fetchApiPut,
} from "@/api/config";
import { FlowFixedCost } from "@/types/models";
import { UUID } from "crypto";

export async function fetchCreateFlowFixedCost(
  body: Partial<FlowFixedCost>
): Promise<FlowFixedCost> {
  const res = await fetchApiPost("/treasury/central/flow/fixedCost", body);
  return res.data;
}

export async function fetchAllFlowFixedCostByBranch(
  url: string
): Promise<FlowFixedCost[]> {
  const res = await fetchApiGet(url);
  return res.data;
}

export async function fetchBulkCreateFlowFixedCost(body: {
  items: Partial<FlowFixedCost>[];
}): Promise<FlowFixedCost[]> {
  const res = await fetchApiPost("/treasury/central/flow/fixedCost/bulk", body);
  return res.data;
}
export async function fetchAllFlowFixedCost(
  url: string
): Promise<{ rows: FlowFixedCost[]; count: number }> {
  const res = await fetchApiGet(url);
  return res.data;
}

export async function fetchEditFlowFixedCost(id: UUID, body: Partial<any>) {
  const res = await fetchApiPut(
    `/backoffice/treasury/central/flow/fixedCost/${id}`,
    body
  );
  return res.data;
}

export async function fetchDeleteFlowFixedCost(id: UUID) {
  const res = await fetchApiDelete(
    `/backoffice/treasury/central/flow/fixedCost/${id}`
  );
  return res.data;
}
