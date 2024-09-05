import { usePathnameData } from "@/hooks/backoffice";
import { QueryTables } from "@/types";
import { IDENTIFIERS_DICTIONARY } from "@/types/dictionaries";
import { ExportIcon } from "@/ui/icons/export";
import { PlusIcon } from "@/ui/icons/plus";
import { ResetIcon } from "@/ui/icons/reset";
import { downloadCSV } from "@/utils/csv";
import getInitialsDate from "@/utils/getInitialsDate";
import { parseDate } from "@internationalized/date";
import { Button, CalendarDate } from "@nextui-org/react";
import { Dispatch, SetStateAction } from "react";
import { UseFormReset } from "react-hook-form";

type Props = {
  isAdmin: boolean;
  isManagement: boolean;
  setDate?: Dispatch<
    SetStateAction<{
      start: CalendarDate;
      end: CalendarDate;
    }>
  >;
  defaultValues: any;
  reset: UseFormReset<any>;
  setQueries: Dispatch<SetStateAction<QueryTables>>;
  rows: any[];
  onOpen: () => void;
};

export default function FilterButtons({
  isAdmin,
  isManagement,
  setDate,
  setQueries,
  defaultValues,
  onOpen,
  rows,
  reset,
}: Props) {
  const { identifier } = usePathnameData();

  function handleReset() {
    if (setDate) {
      setDate({
        start: parseDate(getInitialsDate("start")),
        end: parseDate(getInitialsDate("end")),
      });
    }
    setQueries({
      page: 1,
      limit: "",
      q: "",
      CompanyId: undefined,
      GroupId: undefined,
      BranchId: undefined,
    });
    reset(defaultValues);
  }

  return (
    <div className="w-full flex flex-row justify-center gap-4 md:w-auto md:items-center">
      <Button
        className="bg-foreground text-background max-w-[40px]"
        endContent={<ResetIcon />}
        onClick={handleReset}
        isIconOnly></Button>
      <Button
        onClick={() => downloadCSV(rows, IDENTIFIERS_DICTIONARY[identifier])}
        isIconOnly
        className="bg-foreground text-background"
        endContent={<ExportIcon />}></Button>
      {isAdmin && isManagement && (
        <Button
          isIconOnly
          onClick={onOpen}
          className="bg-foreground text-background"
          endContent={<PlusIcon />}></Button>
      )}
    </div>
  );
}
