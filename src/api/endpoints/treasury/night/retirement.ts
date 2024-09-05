import {
  fetchApiDelete,
  fetchApiGet,
  fetchApiPost,
  fetchApiPut,
} from "@/api/config";
import { Retirement } from "@/types/models";
import { UUID } from "crypto";

export async function fetchAllRetirement(
  url: string
): Promise<{ rows: Retirement[]; count: number }> {
  const res = await fetchApiGet(url);
  return res.data;
}

export async function fetchCreateRetirement(
  body: Partial<Retirement>
): Promise<Retirement> {
  const res = await fetchApiPost("/treasury/night/retirement", body);
  return res.data;
}

export async function fetchEditRetirement(id: UUID, body: Partial<any>) {
  const res = await fetchApiPut(
    `/backoffice/treasury/night/retirement/${id}`,
    body
  );
  return res.data;
}

export async function fetchDeleteRetirement(id: UUID) {
  const res = await fetchApiDelete(
    `/backoffice/treasury/night/retirement/${id}`
  );
  return res.data;
}
