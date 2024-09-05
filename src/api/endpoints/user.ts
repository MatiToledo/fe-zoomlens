import { User, UserBO } from "@/types/models";
import {
  fetchApiDelete,
  fetchApiGet,
  fetchApiPost,
  fetchApiPut,
} from "../config";
import { UUID } from "crypto";

export async function fetchUserMe(): Promise<User> {
  const res = await fetchApiGet("/user/me");
  return res.data;
}
export async function fetchAllUser(
  url: string
): Promise<{ rows: User[]; count: number }> {
  const res = await fetchApiGet(url);
  return res.data;
}

export async function fetchCreateUser(body: any): Promise<User> {
  const res = await fetchApiPost("/backoffice/auth/user", body);
  return res.data;
}
export async function fetchEditUser(id: UUID, body: Partial<any>) {
  const res = await fetchApiPut(`/backoffice/user/${id}`, body);
  return res.data;
}

export async function fetchDeleteUser(id: UUID) {
  const res = await fetchApiDelete(`/backoffice/user/${id}`);
  return res.data;
}

// ----------------------------------------- ADMIN --------------------------------------------

export async function fetchAdminMe(): Promise<User> {
  const res = await fetchApiGet("/backoffice/user/me");
  return res.data;
}

export async function fetchAllAdmin(
  url: string
): Promise<{ rows: UserBO[]; count: number }> {
  const res = await fetchApiGet(url);
  return res.data;
}

export async function fetchCreateAdmin(body: any): Promise<UserBO> {
  const res = await fetchApiPost("/backoffice/auth/admin", body);
  return res.data;
}
export async function fetchEditAdmin(id: UUID, body: Partial<any>) {
  const res = await fetchApiPut(`/backoffice/user/admin/${id}`, body);
  return res.data;
}

export async function fetchDeleteAdmin(id: UUID) {
  const res = await fetchApiDelete(`/backoffice/user/admin/${id}`);
  return res.data;
}
