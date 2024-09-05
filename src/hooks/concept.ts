import { fetchConceptsByLevel } from "@/api/endpoints/concept";
import { SelectOption } from "@/types";
import { useEffect, useState } from "react";

export function useGetConceptsByLevel(
  level: string | undefined,
  onlyVisible: boolean = false
) {
  const [data, setData] = useState<SelectOption[]>([]);
  useEffect(() => {
    async function fetcher() {
      if (level === undefined) return;
      const result = await fetchConceptsByLevel(level, onlyVisible);
      setData(
        result.map((concept) => {
          return {
            value: concept.id,
            label: concept.name,
          };
        })
      );
    }
    fetcher();
    return () => {
      setData([]);
    };
  }, [level]);

  return data;
}
