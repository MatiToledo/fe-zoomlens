import { Company, UserBO } from "@/types/models";
import {
  fetchApiDelete,
  fetchApiGet,
  fetchApiPost,
  fetchApiPut,
} from "../config";
import { UUID } from "crypto";

export async function fetchAllCompany(
  url: string
): Promise<{ rows: Company[]; count: number }> {
  const res = await fetchApiGet(url);
  return res.data;
}

export async function fetchCreateCompany(body: any): Promise<Company> {
  const res = await fetchApiPost("/backoffice/company", body);
  return res.data;
}

export async function fetchEditCompany(id: UUID, body: Partial<any>) {
  const res = await fetchApiPut(`/backoffice/company/${id}`, body);
  return res.data;
}

export async function fetchDeleteCompany(id: UUID) {
  const res = await fetchApiDelete(`/backoffice/company/${id}`);
  return res.data;
}
