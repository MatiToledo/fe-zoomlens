import { CalendarDate } from "@nextui-org/react";
import { FieldValues } from "react-hook-form";
import { KeyedMutator } from "swr";

export function formatSubmitData(data: FieldValues, date: CalendarDate) {
  data.date = `${date.year}-${date.month}-${date.day}`;
  data.amount = parseInt(data.amount);
  return data;
}

export function handleAfterSubmit(
  isModal: boolean,
  mutate?: KeyedMutator<any>,
  reset?: () => void,
  onClose?: () => void,
  push?: (url: string) => void
) {
  if (isModal && mutate && onClose && reset) {
    mutate();
    reset();
    onClose();
  } else {
    push && push("/treasuryNight");
  }
}
