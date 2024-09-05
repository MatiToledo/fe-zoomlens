import { CashRegister } from "@/types/models";
import {
  fetchApiDelete,
  fetchApiGet,
  fetchApiPost,
  fetchApiPut,
} from "../config";
import { UUID } from "crypto";

export async function fetchCashRegisterMovements(url: string): Promise<any> {
  const res = await fetchApiGet(url);
  return res.data;
}

export async function fetchCheckCashRegister(
  body: Partial<CashRegister>
): Promise<boolean> {
  const res = await fetchApiPost("/cashRegister/check", body);
  return res.data;
}

export async function fetchCreateCashRegister(
  body: Partial<CashRegister>
): Promise<CashRegister> {
  const res = await fetchApiPost("/cashRegister", body);
  return res.data;
}

export async function fetchAllCashRegister(
  url: string
): Promise<{ rows: CashRegister[]; count: number }> {
  const res = await fetchApiGet(url);
  return res.data;
}

export async function fetchEditCashRegister(id: UUID, body: Partial<any>) {
  const res = await fetchApiPut(`/backoffice/cashRegister/${id}`, body);
  return res.data;
}

export async function fetchDeleteCashRegister(id: UUID) {
  const res = await fetchApiDelete(`/backoffice/cashRegister/${id}`);
  return res.data;
}
