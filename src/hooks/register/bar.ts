"use client";
import { fetchAllRegisterBarByBranchId } from "@/api/endpoints/register/bar";
import { SelectOption } from "@/types";
import { UUID } from "crypto";
import { useEffect, useState } from "react";

export function useGetRegisterBarsByBranchId(BranchId: UUID) {
  const [data, setData] = useState<SelectOption[]>();
  useEffect(() => {
    async function fetcher() {
      const result = await fetchAllRegisterBarByBranchId(BranchId);
      setData(
        result.map((registerBar) => {
          return {
            value: registerBar.id,
            label: registerBar.name,
          };
        })
      );
    }
    fetcher();
    return () => {
      setData([]);
    };
  }, [BranchId]);

  return data;
}
