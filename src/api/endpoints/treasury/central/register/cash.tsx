import {
  fetchApiDelete,
  fetchApiGet,
  fetchApiPost,
  fetchApiPut,
} from "@/api/config";
import { RegisterCash } from "@/types/models";
import { UUID } from "crypto";

export async function fetchCreateRegisterCash(
  body: Partial<RegisterCash>
): Promise<RegisterCash> {
  const res = await fetchApiPost("/treasury/central/register/cash", body);
  return res.data;
}

export async function fetchBulkCreateRegisterCash(body: {
  items: Partial<RegisterCash>[];
}): Promise<RegisterCash[]> {
  const res = await fetchApiPost("/treasury/central/register/cash/bulk", body);
  return res.data;
}

export async function fetchAllRegisterCashByBranch(
  url: string
): Promise<RegisterCash[]> {
  const res = await fetchApiGet(url);
  return res.data;
}

export async function fetchAllRegisterCash(
  url: string
): Promise<{ rows: RegisterCash[]; count: number }> {
  const res = await fetchApiGet(url);
  return res.data;
}

export async function fetchEditRegisterCash(id: UUID, body: Partial<any>) {
  const res = await fetchApiPut(
    `/backoffice/treasury/central/register/cash/${id}`,
    body
  );
  return res.data;
}

export async function fetchDeleteRegisterCash(id: UUID) {
  const res = await fetchApiDelete(
    `/backoffice/treasury/central/register/cash/${id}`
  );
  return res.data;
}
