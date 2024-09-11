import { User } from "@/types/models";
import getInitialsDate from "@/utils/getInitialsDate";
import { parseDate } from "@internationalized/date";
import { useState } from "react";
import {
  intColumn,
  isoDateColumn,
  keyColumn,
  textColumn,
} from "react-datasheet-grid";
import FiltersTreasuryCentralComponent from "../tables/filters";

import { fetchBulkCreateRegisterCash } from "@/api/endpoints/treasury/central/register/cash";
import { useGetConceptsByLevel } from "@/hooks/concept";
import { useAllTreasuryCentralRegisterCash } from "@/hooks/treasury/central/register/cash";
import { selectColumn } from "@/ui/grid/select";
import GridComponent from "../../grid";

export default function TableTreasuryCentralRegisterCash({
  user,
  title,
}: {
  user: User;
  title: string;
}) {
  const [date, setDate] = useState({
    start: parseDate(getInitialsDate("start")),
    end: parseDate(getInitialsDate("end")),
  });
  const concepts = useGetConceptsByLevel("1");
  const { movements, setMovements, mutate } = useAllTreasuryCentralRegisterCash(
    user.BranchId,
    date
  );

  const columns = [
    { ...keyColumn("date", isoDateColumn), title: "Fecha", maxWidth: 120 },
    {
      ...keyColumn(
        "ConceptId",
        selectColumn({
          choices: concepts as any,
        })
      ),
      title: "Concepto",
      grow: 1.5,
    },
    { ...keyColumn("description", textColumn), title: "Descripcion" },
    { ...keyColumn("revenue", intColumn), title: "Ingreso" },
    { ...keyColumn("expense", intColumn), title: "Egreso" },
    { ...keyColumn("balance", intColumn), title: "Saldo", disabled: true },
  ];

  return (
    <div className="bg-default-300 grow overflow-x-hidden w-full p-5">
      <FiltersTreasuryCentralComponent
        date={date}
        setDate={setDate}
        title={title}
        mutate={mutate}
        BranchId={user.BranchId}
      />
      {concepts.length > 0 && movements && (
        <GridComponent
          data={movements}
          setData={setMovements}
          columns={columns}
          mutate={mutate}
          BranchId={user.BranchId}
          fetcher={fetchBulkCreateRegisterCash}
        />
      )}
    </div>
  );
}
