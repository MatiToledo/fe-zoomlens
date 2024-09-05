import { Branch } from "@/types/models";
import {
  fetchApiDelete,
  fetchApiGet,
  fetchApiPost,
  fetchApiPut,
} from "../config";
import { UUID } from "crypto";

export async function fetchAllBranchesByGroup(url: string): Promise<Branch[]> {
  const res = await fetchApiGet(url);
  return res.data;
}

export async function fetchAllBranch(
  url: string
): Promise<{ rows: Branch[]; count: number }> {
  const res = await fetchApiGet(url);
  return res.data;
}
export async function fetchCreateBranch(body: any): Promise<Branch> {
  const res = await fetchApiPost("/backoffice/branch", body);
  return res.data;
}

export async function fetchEditBranch(id: UUID, body: Partial<any>) {
  const res = await fetchApiPut(`/backoffice/branch/${id}`, body);
  return res.data;
}

export async function fetchDeleteBranch(id: UUID) {
  const res = await fetchApiDelete(`/backoffice/branch/${id}`);
  return res.data;
}
