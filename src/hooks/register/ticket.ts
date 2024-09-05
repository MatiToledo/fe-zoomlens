import { fetchRegisterTicketsByBranchId } from "@/api/endpoints/register/ticket";
import { SelectOption } from "@/types";
import { UUID } from "crypto";
import { useEffect, useState } from "react";

export function useGetRegisterTicketsByBranchId(BranchId: UUID) {
  const [data, setData] = useState<SelectOption[]>();
  useEffect(() => {
    async function fetcher() {
      const result = await fetchRegisterTicketsByBranchId(BranchId);
      setData(
        result.map((registerTicket) => {
          return {
            value: registerTicket.id,
            label: registerTicket.name,
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
