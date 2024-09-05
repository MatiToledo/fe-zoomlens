import { useGetConceptsByLevel } from "@/hooks/concept";
import useGetTreasuryNightResume from "@/hooks/treasury/night";
import { User } from "@/types/models";
import { formattedToday } from "@/utils/formatedToday";
import { parseDate } from "@internationalized/date";
import { useState } from "react";
import GridExpenses from "./grids/expenses";
import GridResume from "./grids/resume";
import HeaderMovements from "./header";
import TableComponent from "@/components/table";

export default function TablesTreasuryNight({ user }: { user: User }) {
  const [date, setDate] = useState(parseDate(formattedToday));
  const concepts = useGetConceptsByLevel("1", true);
  const { data, isLoading, mutate } = useGetTreasuryNightResume(
    user.BranchId,
    date
  );

  return (
    <div className="flex flex-col max-h-[calc(100vh-105px)] min-h-[calc(100vh-105px)]">
      <HeaderMovements
        user={user}
        data={data}
        date={date}
        setDate={setDate}
        mutate={mutate}
      />
      {data && concepts && (
        <div className="flex flex-col gap-5 max-h-[calc(100vh-188px)] min-h-[calc(100vh-188px)] overflow-auto">
          <GridResume
            tableData={data.principalTable}
            date={`${date.year}-${date.month}-${date.day}`}
            BranchId={user.BranchId}
            mutate={mutate}></GridResume>
          <GridExpenses
            concepts={concepts}
            tableData={data.expensesDetailsTable}
            date={`${date.year}-${date.month}-${date.day}`}
            BranchId={user.BranchId}
            mutate={mutate}></GridExpenses>
          <div className="flex flex-col md:flex-row gap-5">
            <TableComponent
              data={data.groupedExpensesTable}
              isLoading={isLoading}
              table={"expensesGrouped"}></TableComponent>
            <TableComponent
              data={data.registersCashTable}
              isLoading={isLoading}
              table={"registers"}></TableComponent>
          </div>
          <div className="flex flex-col md:flex-row gap-5">
            <TableComponent
              data={data.expensesTable}
              isLoading={isLoading}
              table={"expenses"}></TableComponent>
            <TableComponent
              data={data.cashTotalTable}
              isLoading={isLoading}
              table={"totalCash"}></TableComponent>
          </div>
        </div>
      )}
    </div>
  );
}
