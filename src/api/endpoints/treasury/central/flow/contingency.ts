import {
  fetchApiDelete,
  fetchApiGet,
  fetchApiPost,
  fetchApiPut,
} from "@/api/config";
import { FlowContingency } from "@/types/models";
import { UUID } from "crypto";

export async function fetchCreateFlowContingency(
  body: Partial<FlowContingency>
): Promise<FlowContingency> {
  const res = await fetchApiPost("/treasury/central/flow/contingency", body);
  return res.data;
}

export async function fetchAllFlowContingencyByBranch(
  url: string
): Promise<FlowContingency[]> {
  const res = await fetchApiGet(url);
  return res.data;
}

export async function fetchBulkCreateFlowContingency(body: {
  items: Partial<FlowContingency>[];
}): Promise<FlowContingency[]> {
  const res = await fetchApiPost(
    "/treasury/central/flow/contingency/bulk",
    body
  );
  return res.data;
}

export async function fetchAllFlowContingency(
  url: string
): Promise<{ rows: FlowContingency[]; count: number }> {
  const res = await fetchApiGet(url);
  return res.data;
}

export async function fetchEditFlowContingency(id: UUID, body: Partial<any>) {
  const res = await fetchApiPut(
    `/backoffice/treasury/central/flow/contingency/${id}`,
    body
  );
  return res.data;
}

export async function fetchDeleteFlowContingency(id: UUID) {
  const res = await fetchApiDelete(
    `/backoffice/treasury/central/flow/contingency/${id}`
  );
  return res.data;
}
