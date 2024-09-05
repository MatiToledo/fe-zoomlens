import {
  fetchApiDelete,
  fetchApiGet,
  fetchApiPost,
  fetchApiPut,
} from "@/api/config";
import { RetirementFinish } from "@/types/models";
import { UUID } from "crypto";

export async function fetchCreateRetirementFinish(
  body: Partial<RetirementFinish>
): Promise<RetirementFinish> {
  const res = await fetchApiPost("/treasury/night/retirementFinish", body);
  return res.data;
}
export async function fetchAllRetirementFinish(
  url: string
): Promise<{ rows: RetirementFinish[]; count: number }> {
  const res = await fetchApiGet(url);
  return res.data;
}
export async function fetchEditRetirementFinish(id: UUID, body: Partial<any>) {
  const res = await fetchApiPut(
    `/backoffice/treasury/night/retirementFinish/${id}`,
    body
  );
  return res.data;
}

export async function fetchDeleteRetirementFinish(id: UUID) {
  const res = await fetchApiDelete(
    `/backoffice/treasury/night/retirementFinish/${id}`
  );
  return res.data;
}
