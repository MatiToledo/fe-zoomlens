import {
  fetchApiDelete,
  fetchApiGet,
  fetchApiPost,
  fetchApiPut,
} from "@/api/config";
import { RegisterTicket } from "@/types/models";
import { UUID } from "crypto";

export async function fetchRegisterTicketsByBranchId(
  BranchId: UUID
): Promise<RegisterTicket[]> {
  const res = await fetchApiGet("/register/ticket/branch/" + BranchId);
  return res.data;
}
export async function fetchAllRegisterTicket(
  url: string
): Promise<{ rows: RegisterTicket[]; count: number }> {
  const res = await fetchApiGet(url);
  return res.data;
}
export async function fetchCreateRegisterTicket(
  body: Partial<RegisterTicket>
): Promise<RegisterTicket> {
  const res = await fetchApiPost("/backoffice/register/ticket", body);
  return res.data;
}
export async function fetchEditRegisterTicket(
  id: UUID,
  body: Partial<RegisterTicket>
) {
  const res = await fetchApiPut(`/backoffice/register/ticket/${id}`, body);
  return res.data;
}
export async function fetchDeleteRegisterTicket(id: UUID) {
  const res = await fetchApiDelete(`/backoffice/register/ticket/${id}`);
  return res.data;
}
