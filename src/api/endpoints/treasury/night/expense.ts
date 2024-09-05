import {
  fetchApiDelete,
  fetchApiGet,
  fetchApiPost,
  fetchApiPut,
} from "@/api/config";
import { Expense } from "@/types/models";
import { UUID } from "crypto";

export async function fetchBulkCreateExpense(body: any): Promise<any> {
  const res = await fetchApiPost(`/treasury/night/expense/bulk`, body);
  return res.data;
}
export async function fetchAllExpense(
  url: string
): Promise<{ rows: Expense[]; count: number }> {
  const res = await fetchApiGet(url);
  return res.data;
}

export async function fetchCreateExpense(
  body: Partial<Expense>
): Promise<Expense> {
  const res = await fetchApiPost("/treasury/night/expense", body);
  return res.data;
}
export async function fetchEditExpense(id: UUID, body: Partial<any>) {
  const res = await fetchApiPut(
    `/backoffice/treasury/night/expense/${id}`,
    body
  );
  return res.data;
}

export async function fetchDeleteExpense(id: UUID) {
  const res = await fetchApiDelete(`/backoffice/treasury/night/expense/${id}`);
  return res.data;
}
