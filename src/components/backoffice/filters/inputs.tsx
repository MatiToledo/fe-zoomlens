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
    month: undefined,
    week: undefined,
    role: undefined,
    ConceptId: undefined,
    limit: null,
  };
  const { control, watch, getValues, reset } = useForm({
    defaultValues,
  });
  const showYear = new Date().getFullYear() !== 2024;

  const { companies, groups, branches, concepts, selectedFields } = useFilters({
    watch,
    getValues,
    setQueries,
  });

  const getGridClasses = (filtersCant: number) => {
    switch (filtersCant) {
      case 1:
        return "lg:grid-cols-[200px]";
      case 2:
        return "lg:grid-cols-[200px_repeat(2,minmax(120px,200px))]";
      case 3:
        return "lg:grid-cols-[200px_repeat(3,minmax(120px,200px))]";
      case 4:
        return "lg:grid-cols-[200px_repeat(4,minmax(120px,200px))]";
      case 5:
        return "lg:grid-cols-[200px_225px_repeat(3,minmax(120px,200px))] md:grid-cols-2 lg:grid-rows-1";
      case 6:
      default:
        return `lg:grid-cols-[200px_225px_repeat(4,minmax(120px,200px))]`;
    }
  };

  return (
    <div className="w-full flex flex-col gap-4 lg:flex-row">
      <div
        className={`w-full flex flex-col gap-4 items-center md:grid ${getGridClasses(
          filtersCant
        )}`}>
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
        {filters.includes("year") && showYear && (
          <ControlledSelect
            label="Año"
            key={selectedFields.year ? "year-selected" : "year-not-selected"}
            options={Array.from({ length: 10 }, (_, index) => 2024 + index).map(
              (year) => ({ value: year, label: year })
            )}
            control={control}
            name={"year"}></ControlledSelect>
        )}
        {filters.includes("month") && (
          <ControlledSelect
            label="Mes"
            key={selectedFields.month ? "month-selected" : "month-not-selected"}
            options={[
              { label: "Enero", value: "1" },
              { label: "Febrero", value: "2" },
              { label: "Marzo", value: "3" },
              { label: "Abril", value: "4" },
              { label: "Mayo", value: "5" },
              { label: "Junio", value: "6" },
              { label: "Julio", value: "7" },
              { label: "Agosto", value: "8" },
              { label: "Septiembre", value: "9" },
              { label: "Octubre", value: "10" },
              { label: "Noviembre", value: "11" },
              { label: "Diciembre", value: "12" },
            ]}
            control={control}
            name={"month"}></ControlledSelect>
        )}
        {filters.includes("week") && (
          <ControlledSelect
            label="Semana"
            key={selectedFields.week ? "week-selected" : "week-not-selected"}
            options={[
              { label: "1", value: "1" },
              { label: "2", value: "2" },
              { label: "3", value: "3" },
              { label: "4", value: "4" },
              { label: "5", value: "5" },
            ]}
            control={control}
            name={"week"}></ControlledSelect>
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
