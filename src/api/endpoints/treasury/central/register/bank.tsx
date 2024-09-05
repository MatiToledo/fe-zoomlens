import {
  fetchApiDelete,
  fetchApiGet,
  fetchApiPost,
  fetchApiPut,
} from "@/api/config";
import { RegisterBank } from "@/types/models";
import { UUID } from "crypto";

export async function fetchCreateRegisterBank(
  body: Partial<RegisterBank>
): Promise<RegisterBank> {
  const res = await fetchApiPost("/treasury/central/register/bank", body);
  return res.data;
}

export async function fetchBulkCreateRegisterBank(body: {
  items: Partial<RegisterBank>[];
}): Promise<RegisterBank[]> {
  const res = await fetchApiPost("/treasury/central/register/bank/bulk", body);
  return res.data;
}

export async function fetchAllRegisterBankByBranch(
  url: string
): Promise<RegisterBank[]> {
  const res = await fetchApiGet(url);
  return res.data;
}

export async function fetchAllRegisterBank(
  url: string
): Promise<{ rows: RegisterBank[]; count: number }> {
  const res = await fetchApiGet(url);
  return res.data;
}

export async function fetchEditRegisterBank(id: UUID, body: Partial<any>) {
  const res = await fetchApiPut(
    `/backoffice/treasury/central/register/bank/${id}`,
    body
  );
  return res.data;
}

export async function fetchDeleteRegisterBank(id: UUID) {
  const res = await fetchApiDelete(
    `/backoffice/treasury/central/register/bank/${id}`
  );
  return res.data;
}
