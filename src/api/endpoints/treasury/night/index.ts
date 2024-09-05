import { fetchApiGet, fetchApiPost } from "@/api/config";

export async function fetchTreasuryNightResume(url: string): Promise<any> {
  const res = await fetchApiGet(url);
  return res.data;
}

export async function fetchBulkCreateTreasuryNight(
  body: any,
  date: string
): Promise<any> {
  const res = await fetchApiPost(
    `/treasury/night/resume/bulk?date=${date}`,
    body
  );
  return res.data;
}
