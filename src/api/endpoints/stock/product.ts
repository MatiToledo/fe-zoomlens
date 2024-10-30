import {
  fetchApiDelete,
  fetchApiGet,
  fetchApiPost,
  fetchApiPut,
} from "@/api/config";
import { Product } from "@/types/models";
import { UUID } from "crypto";

export async function fetchProductsByBranchId(url: string): Promise<Product[]> {
  const res = await fetchApiGet(url);
  return res.data;
}

export async function fetchAllProducts(
  url: string
): Promise<{ rows: Product[]; count: number }> {
  const res = await fetchApiGet(url);
  return res.data;
}

export async function fetchBulkCreateProducts(body: {
  items: Partial<Product>[];
}): Promise<Product[]> {
  const res = await fetchApiPost("/stock/product/bulk", body);
  return res.data;
}

export async function fetchEditProduct(id: UUID, body: Partial<any>) {
  const res = await fetchApiPut(`/backoffice/stock/product/${id}`, body);
  return res.data;
}

export async function fetchDeleteProduct(id: UUID) {
  const res = await fetchApiDelete(`/backoffice/stock/product/${id}`);
  return res.data;
}
