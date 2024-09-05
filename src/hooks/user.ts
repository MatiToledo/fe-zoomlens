"use client";
import { fetchApiGet } from "@/api/config";
import { User } from "@/types/models";
import useSWR from "swr";

export function useGetMe() {
  const { data, isLoading, error } = useSWR(
    `/user/me`,
    (url) => fetchApiGet(url),
    {
      revalidateOnMount: true,
      revalidateIfStale: false,
    }
  );

  return {
    me: data?.data as User,
    isLoading,
    isError: error,
  };
}
