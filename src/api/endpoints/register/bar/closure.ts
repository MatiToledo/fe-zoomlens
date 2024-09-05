import {
  fetchApiDelete,
  fetchApiGet,
  fetchApiPost,
  fetchApiPut,
} from "@/api/config";
import { RegisterBarClosure } from "@/types/models";
import { UUID } from "crypto";

export async function fetchCheckRegisterBarClosure(
  body: Partial<RegisterBarClosure>
): Promise<boolean> {
  const res = await fetchApiPost("/register/bar/closure/check", body);
  return res.data;
}
export async function fetchCreateRegisterBarClosure(
  body: Partial<RegisterBarClosure>
): Promise<RegisterBarClosure> {
  const res = await fetchApiPost("/register/bar/closure", body);
  return res.data;
}

export async function fetchAllRegisterBarClosure(
  url: string
): Promise<{ rows: RegisterBarClosure[]; count: number }> {
  const res = await fetchApiGet(url);
  return res.data;
}

export async function fetchEditRegisterBarClosure(
  id: UUID,
  body: Partial<RegisterBarClosure>
) {
  const res = await fetchApiPut(`/backoffice/register/bar/closure/${id}`, body);
  return res.data;
}

export async function fetchDeleteRegisterBarClosure(id: UUID) {
  const res = await fetchApiDelete(`/backoffice/register/bar/closure/${id}`);
  return res.data;
}
