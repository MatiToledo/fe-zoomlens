import { useGetFixedCost } from "@/hooks/treasury/central/fixedCost";
import { User } from "@/types/models";
import { calculateWeekends } from "@/utils/calculateWeekends";
import { formattedToday } from "@/utils/formatedToday";
import { parseDate } from "@internationalized/date";
import { useState } from "react";
import GridConcepts from "./gridConcepts";
import TableMonth from "./tableMonth";
import WeeksCalculations from "./weeksCalculations";
import { MONTHS_DICTIONARIES } from "@/types/dictionaries";
import TableTotal from "./tableTotals";

export default function FixedCostContent({ user }: { user: User }) {
  const [date, setDate] = useState(parseDate(formattedToday));
  const { data, mutate, isLoading } = useGetFixedCost(user.BranchId, date);
  const { weekendCount, weekends } = calculateWeekends(date.month, date.year);

  return (
    <div className="p-5 flex flex-col justify-center items-center w-full gap-5">
      <div className="w-full flex flex-col gap-5 items-center justify-center xl:flex-row">
        <TableMonth
          date={date}
          setDate={setDate}
          month={date.month}
          weekends={weekends}
          weekendCount={weekendCount}></TableMonth>
        {data && !isLoading && (
          <TableTotal data={data.totalsTable}></TableTotal>
        )}
      </div>

      {data && !isLoading ? (
        <>
          <GridConcepts
            concepts={data.FixedCost.FixedCostConcepts}
            mutate={mutate}
            FixedCostId={data.FixedCost.id}
            totalAmount={data.totalAmount}></GridConcepts>
          <WeeksCalculations
            totalAmount={data.totalAmount}
            mutate={mutate}
            weekendCount={weekendCount}
            weekendsData={data.weekendsTable}
            FixedCostId={data.FixedCost.id}></WeeksCalculations>
        </>
      ) : (
        <h1 className="text-4xl font-bold tracking-tight mt-[50px] max-w-[350px] text-center">
          No se creó el cálculo de costos fijos para{" "}
          {MONTHS_DICTIONARIES[date.month]}
        </h1>
      )}
    </div>
  );
}
