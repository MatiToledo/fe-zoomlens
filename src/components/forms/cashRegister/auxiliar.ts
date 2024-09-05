import { CalendarDate } from "@nextui-org/react";
import { UUID } from "crypto";
import { FieldValues } from "react-hook-form";
import { KeyedMutator } from "swr";

export function formatSubmitData(
  data: FieldValues,
  date: CalendarDate,
  BranchId: UUID
) {
  data.date = `${date.year}-${date.month}-${date.day}`;
  data.amountActual = parseInt(data.amountActual);
  data.earnedAccount = parseInt(data.earnedAccount);
  data.BranchId = BranchId;
  return data;
}

export function handleAfterSubmit(
  isModal: boolean,
  mutate?: KeyedMutator<any>,
  reset?: () => void,
  onClose?: () => void,
  push?: (url: string) => void
) {
  setTimeout(() => {
    if (isModal && mutate && onClose && reset) {
      mutate();
      reset();
      onClose();
    } else {
      push && push("/treasuryNight");
    }
  }, 200);
}
