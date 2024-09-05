import {
  fetchApiDelete,
  fetchApiGet,
  fetchApiPost,
  fetchApiPut,
} from "@/api/config";
import { FlowWorks } from "@/types/models";
import { UUID } from "crypto";

export async function fetchCreateFlowWorks(
  body: Partial<FlowWorks>
): Promise<FlowWorks> {
  const res = await fetchApiPost("/treasury/central/flow/works", body);
  return res.data;
}

export async function fetchAllFlowWorksByBranch(
  url: string
): Promise<FlowWorks[]> {
  const res = await fetchApiGet(url);
  return res.data;
}
export async function fetchBulkCreateFlowWorks(body: {
  items: Partial<FlowWorks>[];
}): Promise<FlowWorks[]> {
  const res = await fetchApiPost("/treasury/central/flow/works/bulk", body);
  return res.data;
}
export async function fetchAllFlowWorks(
  url: string
): Promise<{ rows: FlowWorks[]; count: number }> {
  const res = await fetchApiGet(url);
  return res.data;
}

export async function fetchEditFlowWorks(id: UUID, body: Partial<any>) {
  const res = await fetchApiPut(
    `/backoffice/treasury/central/flow/works/${id}`,
    body
  );
  return res.data;
}

export async function fetchDeleteFlowWorks(id: UUID) {
  const res = await fetchApiDelete(
    `/backoffice/treasury/central/flow/works/${id}`
  );
  return res.data;
}
