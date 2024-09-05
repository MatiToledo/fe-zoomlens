import { usePathnameData } from "@/hooks/backoffice";
import { QueryTables } from "@/types";
import { IDENTIFIERS_DICTIONARY } from "@/types/dictionaries";
import { UserBO } from "@/types/models";
import ControlledPagination from "@/ui/inputs/pagination";
import { CalendarDate, Divider } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import FilterInputs from "./inputs";

type Props = {
  filters: string[];
  user: UserBO;
  date?: {
    start: CalendarDate;
    end: CalendarDate;
  };
  setDate?: Dispatch<
    SetStateAction<{
      start: CalendarDate;
      end: CalendarDate;
    }>
  >;
  queries: QueryTables;
  setQueries: Dispatch<SetStateAction<QueryTables>>;
  count: number;
  rows: any[];
  onOpen: () => void;
};

export default function BOFilters({
  filters,
  user,
  date,
  onOpen,
  setDate,
  queries,
  setQueries,
  rows,
  count,
}: Props) {
  const isAdmin = user?.role === "admin";
  const { isManagement } = usePathnameData();
  const { identifier } = usePathnameData();
  return (
    <div className="w-full flex flex-col gap-4">
      <FilterInputs
        rows={rows}
        date={date}
        setDate={setDate}
        filters={filters}
        queries={queries}
        setQueries={setQueries}
        isAdmin={isAdmin}
        onOpen={onOpen}
        isManagement={isManagement}
        user={user}></FilterInputs>
      <Divider className="lg:hidden" />
      <h1 className="mb-1 text-4xl font-bold leading-none tracking-tight text-center text-gray-900  dark:text-white md:hidden">
        {IDENTIFIERS_DICTIONARY[identifier]}
      </h1>
      <div className="w-full flex justify-between items-end">
        <div>
          <p className="text-lg font-normal text-gray-700 lg:text-xl  dark:text-gray-100">
            Total: {count}
          </p>
        </div>
        <h1 className="mb-1 text-4xl font-bold leading-none tracking-tight text-center text-gray-900  dark:text-white hidden md:block">
          {IDENTIFIERS_DICTIONARY[identifier]}
        </h1>
        <div className="flex flex-row w-[140px]">
          <ControlledPagination queries={queries} setQueries={setQueries} />
        </div>
      </div>
    </div>
  );
}
