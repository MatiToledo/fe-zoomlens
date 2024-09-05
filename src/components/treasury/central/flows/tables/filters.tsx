"use client";
import TreasuryCentralForm from "@/components/forms/treasury/central";
import TreasuryCentralPostnetForm from "@/components/forms/treasury/central/postnet";
import { usePathnameData } from "@/hooks/backoffice";
import { PlusIcon } from "@/ui/icons/plus";
import { ResetIcon } from "@/ui/icons/reset";
import ControlledDateRangePicker from "@/ui/inputs/dateRangePicker";
import getInitialsDate from "@/utils/getInitialsDate";
import { parseDate } from "@internationalized/date";
import { Button } from "@nextui-org/button";
import { CalendarDate, useDisclosure } from "@nextui-org/react";
import { UUID } from "crypto";
import { Dispatch, SetStateAction } from "react";
import { KeyedMutator } from "swr";

export default function FiltersTreasuryCentralComponent({
  date,
  setDate,
  title,
  BranchId,
  mutate,
}: {
  date: { start: CalendarDate; end: CalendarDate };
  setDate: Dispatch<SetStateAction<{ start: CalendarDate; end: CalendarDate }>>;
  title: string;
  BranchId: UUID;
  mutate: KeyedMutator<any>;
}) {
  const { pathname } = usePathnameData();
  const isPostnet = pathname.includes("postnet");

  function handleReset() {
    setDate({
      start: parseDate(getInitialsDate("start")),
      end: parseDate(getInitialsDate("end")),
    });
  }

  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <div className="flex flex-col w-full justify-between items-center md:flex-row gap-2 mb-5 relative">
        <div className="sm:max-w-[250px] sm:w-[250px]">
          <ControlledDateRangePicker date={date} setDate={setDate} />
        </div>
        <h1 className="text-4xl font-bold tracking-tight  text-center">
          {title}
        </h1>
        <div className="flex flex-row justify-center md:justify-end items-center h-[48px] gap-4 min-w-[250px]">
          <Button
            className="bg-foreground text-background"
            endContent={<PlusIcon />}
            onClick={() => onOpen()}
            size="sm"></Button>
          <Button
            className="bg-foreground text-background"
            startContent={<ResetIcon />}
            onClick={handleReset}
            size="sm"></Button>
        </div>
      </div>
      {isOpen && (
        <>
          {isPostnet ? (
            <TreasuryCentralPostnetForm
              isOpen={isOpen}
              onClose={onClose}
              BranchId={BranchId}
              mutate={mutate}
            />
          ) : (
            <TreasuryCentralForm
              isOpen={isOpen}
              onClose={onClose}
              BranchId={BranchId}
              mutate={mutate}
            />
          )}
        </>
      )}
    </>
  );
}
