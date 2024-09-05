import { User } from "@/types/models";
import { fetchApiPost } from "../config";

export async function fetchLogIn(
  email: string,
  password: string
): Promise<{ token: string; role: string }> {
  const res = await fetchApiPost("/auth/token", {
    email: email.trim().toLowerCase(),
    password,
  });
  return res.data;
}

export async function fetchLogInBackOffice(
  email: string,
  password: string
): Promise<{ token: string; role: string }> {
  const res = await fetchApiPost("/backoffice/auth/token", {
    email: email.trim().toLowerCase(),
    password,
  });
  return res.data;
}
