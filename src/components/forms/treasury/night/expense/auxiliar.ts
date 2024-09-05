import { CalendarDate } from "@nextui-org/react";
import { UUID } from "crypto";
import { FieldValues } from "react-hook-form";
import { KeyedMutator } from "swr";

export function formatSubmitData(
  data: FieldValues,
  date: CalendarDate,
  concepts: any,
  BranchId: UUID
) {
  data.date = `${date.year}-${date.month}-${date.day}`;
  data.unitPrice = parseInt(data.unitPrice);
  data.quantity = parseInt(data.quantity);
  data.BranchId = BranchId;
  data.ConceptId = concepts?.find(
    (concept: any) => concept.label === data.conceptSelected
  )?.value;
  delete data.conceptSelected;
  return data;
}

export function handleCreate(data: any) {}

export function handleEdit(data: any) {}

export function handleDelete(data: any) {}

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
