import {
  fetchApiDelete,
  fetchApiGet,
  fetchApiPost,
  fetchApiPut,
} from "@/api/config";
import { RegisterTicketClosure } from "@/types/models";
import { UUID } from "crypto";

export async function fetchCheckRegisterTicketClosure(
  body: Partial<RegisterTicketClosure>
): Promise<boolean> {
  const res = await fetchApiPost("/register/ticket/closure/check", body);
  return res.data;
}

export async function fetchCreateRegisterTicketClosure(
  body: Partial<RegisterTicketClosure>
): Promise<RegisterTicketClosure> {
  const res = await fetchApiPost("/register/ticket/closure", body);
  return res.data;
}

export async function fetchAllRegisterTicketClosure(
  url: string
): Promise<{ rows: RegisterTicketClosure[]; count: number }> {
  const res = await fetchApiGet(url);
  return res.data;
}

export async function fetchEditRegisterTicketClosure(
  id: UUID,
  body: Partial<RegisterTicketClosure>
) {
  const res = await fetchApiPut(
    `/backoffice/register/ticket/closure/${id}`,
    body
  );
  return res.data;
}

export async function fetchDeleteRegisterTicketClosure(id: UUID) {
  const res = await fetchApiDelete(`/backoffice/register/ticket/closure/${id}`);
  return res.data;
}
