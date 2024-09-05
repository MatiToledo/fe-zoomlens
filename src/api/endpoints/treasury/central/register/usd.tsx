import {
  fetchApiDelete,
  fetchApiGet,
  fetchApiPost,
  fetchApiPut,
} from "@/api/config";
import { RegisterUSD } from "@/types/models";
import { UUID } from "crypto";

export async function fetchCreateRegisterUSD(
  body: Partial<RegisterUSD>
): Promise<RegisterUSD> {
  const res = await fetchApiPost("/treasury/central/register/usd", body);
  return res.data;
}

export async function fetchBulkCreateRegisterUSD(body: {
  items: Partial<RegisterUSD>[];
}): Promise<RegisterUSD[]> {
  const res = await fetchApiPost("/treasury/central/register/usd/bulk", body);
  return res.data;
}

export async function fetchAllRegisterUSDByBranch(
  url: string
): Promise<RegisterUSD[]> {
  const res = await fetchApiGet(url);
  return res.data;
}
export async function fetchAllRegisterUSD(
  url: string
): Promise<{ rows: RegisterUSD[]; count: number }> {
  const res = await fetchApiGet(url);
  return res.data;
}

export async function fetchEditRegisterUSD(id: UUID, body: Partial<any>) {
  const res = await fetchApiPut(
    `/backoffice/treasury/central/register/usd/${id}`,
    body
  );
  return res.data;
}

export async function fetchDeleteRegisterUSD(id: UUID) {
  const res = await fetchApiDelete(
    `/backoffice/treasury/central/register/usd/${id}`
  );
  return res.data;
}
