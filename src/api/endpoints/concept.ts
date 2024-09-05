import { UUID } from "crypto";
import {
  fetchApiDelete,
  fetchApiGet,
  fetchApiPost,
  fetchApiPut,
} from "../config";
import { Concept } from "@/types/models";

export async function fetchConceptsByLevel(
  level: string,
  onlyVisible: boolean
): Promise<Concept[]> {
  const res = await fetchApiGet(
    `/concept?level=${level}${onlyVisible ? "&visible=true" : ""}`
  );
  return res.data;
}

export async function fetchAllConcept(
  url: string
): Promise<{ rows: Concept[]; count: number }> {
  const res = await fetchApiGet(url);
  return res.data;
}
export async function fetchCreateConcept(body: any): Promise<Concept> {
  const res = await fetchApiPost("/backoffice/concept", body);
  return res.data;
}

export async function fetchEditConcept(id: UUID, body: Partial<any>) {
  const res = await fetchApiPut(`/backoffice/concept/${id}`, body);
  return res.data;
}

export async function fetchDeleteConcept(id: UUID) {
  const res = await fetchApiDelete(`/backoffice/concept/${id}`);
  return res.data;
}
