import {
  fetchApiDelete,
  fetchApiGet,
  fetchApiPost,
  fetchApiPut,
} from "@/api/config";
import { RegisterBar } from "@/types/models";
import { UUID } from "crypto";

export async function fetchAllRegisterBarByBranchId(
  BranchId: UUID
): Promise<RegisterBar[]> {
  const res = await fetchApiGet(`/register/bar/branch/${BranchId}`);
  return res.data;
}

export async function fetchCreateRegisterBar(
  body: Partial<RegisterBar>
): Promise<RegisterBar> {
  const res = await fetchApiPost("/backoffice/register/bar", body);
  return res.data;
}

export async function fetchEditRegisterBar(
  id: UUID,
  body: Partial<RegisterBar>
) {
  const res = await fetchApiPut(`/backoffice/register/bar/${id}`, body);
  return res.data;
}

export async function fetchDeleteRegisterBar(id: UUID) {
  const res = await fetchApiDelete(`/backoffice/register/bar/${id}`);
  return res.data;
}

export async function fetchAllRegisterBar(
  url: string
): Promise<{ rows: RegisterBar[]; count: number }> {
  const res = await fetchApiGet(url);
  return res.data;
}
