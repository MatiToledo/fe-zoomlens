import {
  fetchApiDelete,
  fetchApiGet,
  fetchApiPost,
  fetchApiPut,
} from "@/api/config";
import { PostnetMP } from "@/types/models";
import { UUID } from "crypto";

export async function fetchCreatePostnetMP(
  body: Partial<PostnetMP>
): Promise<PostnetMP> {
  const res = await fetchApiPost("/treasury/central/postnet/mp", body);
  return res.data;
}

export async function fetchBulkCreatePostnetMP(body: {
  items: Partial<PostnetMP>[];
}): Promise<PostnetMP[]> {
  const res = await fetchApiPost("/treasury/central/postnet/mp/bulk", body);
  return res.data;
}

export async function fetchAllPostnetMPByBranch(
  url: string
): Promise<PostnetMP[]> {
  const res = await fetchApiGet(url);
  return res.data;
}
export async function fetchAllPostnetMP(
  url: string
): Promise<{ rows: PostnetMP[]; count: number }> {
  const res = await fetchApiGet(url);
  return res.data;
}
export async function fetchEditPostnetMP(id: UUID, body: Partial<any>) {
  const res = await fetchApiPut(
    `/backoffice/treasury/central/postnet/mp/${id}`,
    body
  );
  return res.data;
}

export async function fetchDeletePostnetMP(id: UUID) {
  const res = await fetchApiDelete(
    `/backoffice/treasury/central/postnet/mp/${id}`
  );
  return res.data;
}
