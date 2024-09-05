import { User } from "@/types/models";
import getInitialsDate from "@/utils/getInitialsDate";
import { parseDate } from "@internationalized/date";
import { useState } from "react";
import { isoDateColumn, keyColumn, textColumn } from "react-datasheet-grid";

import { fetchBulkCreatePostnetBank } from "@/api/endpoints/treasury/central/postnet/bank";
import { useAllTreasuryCentralPostnetBank } from "@/hooks/treasury/central/postnet/bank";
import { moneyColumn } from "@/ui/grid/money";
import FiltersTreasuryCentralComponent from "../../flows/tables/filters";
import GridComponent from "../../grid";

export default function TableTreasuryCentralPostnetBank({
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
  const { movements, setMovements, mutate } = useAllTreasuryCentralPostnetBank(
    user.BranchId,
    date
  );

  const columns = [
    { ...keyColumn("date", isoDateColumn), title: "Fecha", maxWidth: 130 },
    { ...keyColumn("comment", textColumn), title: "Comentario" },
    { ...keyColumn("debit", moneyColumn), title: "Debito" },
    { ...keyColumn("credit", moneyColumn), title: "Credito" },
    { ...keyColumn("qr", moneyColumn), title: "QR" },
    { ...keyColumn("total", moneyColumn), title: "Total", disabled: true },
  ];

  return (
    <div className="bg-default-300 grow overflow-x-hidden w-full p-5">
      <FiltersTreasuryCentralComponent
        date={date}
        setDate={setDate}
        title={title}
        BranchId={user.BranchId}
        mutate={mutate}
      />
      {movements && (
        <GridComponent
          data={movements}
          setData={setMovements}
          columns={columns}
          mutate={mutate}
          BranchId={user.BranchId}
          fetcher={fetchBulkCreatePostnetBank}
        />
      )}
    </div>
  );
}
