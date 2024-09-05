import { useFilters } from "@/hooks/backoffice";
import { QueryTables } from "@/types";
import { UserBO } from "@/types/models";
import ControlledDateRangePicker from "@/ui/inputs/dateRangePicker";
import ControlledSearch from "@/ui/inputs/search";
import { ControlledSelect } from "@/ui/inputs/select";
import { CalendarDate } from "@nextui-org/react";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import FilterButtons from "./buttons";

type Props = {
  filters: string[];
  isAdmin: boolean;
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
  isManagement: boolean;
  setQueries: Dispatch<SetStateAction<QueryTables>>;
  queries: QueryTables;
  rows: any[];
  onOpen: () => void;
};

export default function FilterInputs({
  rows,
  date,
  setDate,
  filters,
  isAdmin,
  isManagement,
  onOpen,
  user,
  setQueries,
  queries,
}: Props) {
  const filtersCant = filters.length + 1;
  const defaultValues = {
    CompanyId: isAdmin ? undefined : user?.CompanyId,
    GroupId: undefined,
    BranchId: undefined,
    level: undefined,
    role: undefined,
    ConceptId: undefined,
    limit: null,
  };
  const { control, watch, getValues, reset } = useForm({
    defaultValues,
  });
  const { companies, groups, branches, concepts, selectedFields } = useFilters({
    watch,
    getValues,
    setQueries,
  });

  return (
    <div className="w-full flex flex-col gap-4 lg:flex-row">
      <div
        className={`w-full flex flex-col gap-4 items-center md:grid 
      
          ${filtersCant === 1 && "lg:grid-cols-[200px]"}
          ${
            filtersCant === 2 &&
            "lg:grid-cols-[200px_repeat(2,minmax(120px,200px))]"
          }
          ${
            filtersCant === 3 &&
            "lg:grid-cols-[200px_repeat(3,minmax(120px,200px))]"
          }
          ${
            filtersCant === 4 &&
            "lg:grid-cols-[200px_repeat(4,minmax(120px,200px))]"
          }
          ${
            filtersCant === 5 &&
            "lg:grid-cols-[200px_225px_repeat(3,minmax(120px,200px))] md:grid-cols-2  lg:grid-rows-1"
          }
          ${
            filtersCant === 6 &&
            "lg:grid-cols-[200px_225px_repeat(4,minmax(120px,200px))]"
          }`}>
        <ControlledSearch setQueries={setQueries} queries={queries} />
        {filters.includes("dates") && setDate && date && (
          <ControlledDateRangePicker
            date={date}
            setDate={setDate}></ControlledDateRangePicker>
        )}
        {filters.includes("companies") && (
          <ControlledSelect
            key={
              selectedFields.CompanyId
                ? "company-selected"
                : "company-not-selected"
            }
            label="Compania"
            options={companies}
            control={control}
            name={"CompanyId"}></ControlledSelect>
        )}
        {filters.includes("groups") && selectedFields.CompanyId && (
          <ControlledSelect
            label="Grupo"
            key={
              selectedFields.GroupId ? "group-selected" : "group-not-selected"
            }
            options={groups}
            control={control}
            name={"GroupId"}></ControlledSelect>
        )}
        {filters.includes("branches") && selectedFields.GroupId && (
          <ControlledSelect
            label="Sucursal"
            key={
              selectedFields.BranchId
                ? "branch-selected"
                : "branch-not-selected"
            }
            options={branches}
            control={control}
            name={"BranchId"}></ControlledSelect>
        )}
        {filters.includes("role") && (
          <ControlledSelect
            label="Rol"
            key={selectedFields.role ? "role-selected" : "role-not-selected"}
            options={[
              { label: "Administrador", value: "admin" },
              { label: "Socio", value: "partner" },
            ]}
            control={control}
            name={"role"}></ControlledSelect>
        )}
        {filters.includes("level") && (
          <ControlledSelect
            label="Nivel"
            key={selectedFields.level ? "role-selected" : "role-not-selected"}
            options={[
              { label: "Nivel 1", value: "1" },
              { label: "Nivel 2", value: "2" },
              { label: "Nivel 3", value: "3" },
            ]}
            control={control}
            name={"level"}></ControlledSelect>
        )}
      </div>
      <FilterButtons
        rows={rows}
        onOpen={onOpen}
        isAdmin={isAdmin}
        defaultValues={defaultValues}
        isManagement={isManagement}
        setDate={setDate}
        setQueries={setQueries}
        reset={reset}
      />
    </div>
  );
}
