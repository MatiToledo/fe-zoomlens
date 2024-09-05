import { Group } from "@/types/models";
import {
  fetchApiDelete,
  fetchApiGet,
  fetchApiPost,
  fetchApiPut,
} from "../config";
import { UUID } from "crypto";

export async function fetchAllGroupsByCompany(url: string): Promise<Group[]> {
  const res = await fetchApiGet(url);
  return res.data;
}

export async function fetchAllGroup(
  url: string
): Promise<{ rows: Group[]; count: number }> {
  const res = await fetchApiGet(url);
  return res.data;
}

export async function fetchCreateGroup(body: any): Promise<Group> {
  const res = await fetchApiPost("/backoffice/group", body);
  return res.data;
}

export async function fetchEditGroup(id: UUID, body: Partial<any>) {
  const res = await fetchApiPut(`/backoffice/group/${id}`, body);
  return res.data;
}

export async function fetchDeleteGroup(id: UUID) {
  const res = await fetchApiDelete(`/backoffice/group/${id}`);
  return res.data;
}
