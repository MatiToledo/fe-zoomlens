import {
  fetchApiDelete,
  fetchApiGet,
  fetchApiPost,
  fetchApiPut,
} from "@/api/config";
import { PostnetBank } from "@/types/models";
import { UUID } from "crypto";

export async function fetchCreatePostnetBank(
  body: Partial<PostnetBank>
): Promise<PostnetBank> {
  const res = await fetchApiPost("/treasury/central/postnet/bank", body);
  return res.data;
}

export async function fetchBulkCreatePostnetBank(body: {
  items: Partial<PostnetBank>[];
}): Promise<PostnetBank[]> {
  const res = await fetchApiPost("/treasury/central/postnet/bank/bulk", body);
  return res.data;
}

export async function fetchAllPostnetBankByBranch(
  url: string
): Promise<PostnetBank[]> {
  const res = await fetchApiGet(url);
  return res.data;
}

export async function fetchAllPostnetBank(
  url: string
): Promise<{ rows: PostnetBank[]; count: number }> {
  const res = await fetchApiGet(url);
  return res.data;
}
export async function fetchEditPostnetBank(id: UUID, body: Partial<any>) {
  const res = await fetchApiPut(
    `/backoffice/treasury/central/postnet/bank/${id}`,
    body
  );
  return res.data;
}

export async function fetchDeletePostnetBank(id: UUID) {
  const res = await fetchApiDelete(
    `/backoffice/treasury/central/postnet/bank/${id}`
  );
  return res.data;
}
