import {
  fetchApiDelete,
  fetchApiGet,
  fetchApiPost,
  fetchApiPut,
} from "@/api/config";
import { RegisterMP } from "@/types/models";
import { UUID } from "crypto";

export async function fetchCreateRegisterMP(
  body: Partial<RegisterMP>
): Promise<RegisterMP> {
  const res = await fetchApiPost("/treasury/central/register/mp", body);
  return res.data;
}

export async function fetchBulkCreateRegisterMP(body: {
  items: Partial<RegisterMP>[];
}): Promise<RegisterMP[]> {
  const res = await fetchApiPost("/treasury/central/register/mp/bulk", body);
  return res.data;
}

export async function fetchAllRegisterMPByBranch(
  url: string
): Promise<RegisterMP[]> {
  const res = await fetchApiGet(url);
  return res.data;
}
export async function fetchAllRegisterMP(
  url: string
): Promise<{ rows: RegisterMP[]; count: number }> {
  const res = await fetchApiGet(url);
  return res.data;
}

export async function fetchEditRegisterMP(id: UUID, body: Partial<any>) {
  const res = await fetchApiPut(
    `/backoffice/treasury/central/register/mp/${id}`,
    body
  );
  return res.data;
}

export async function fetchDeleteRegisterMP(id: UUID) {
  const res = await fetchApiDelete(
    `/backoffice/treasury/central/register/mp/${id}`
  );
  return res.data;
}
