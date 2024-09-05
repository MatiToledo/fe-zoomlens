import { FieldValues } from "react-hook-form";
import { KeyedMutator } from "swr";

export function formatSubmitData(data: FieldValues, date: any) {
  return {
    ...data,
    date: `${date.year}-${date.month}-${date.day}`,
    amount: parseInt(data.amount),
    postnet: parseInt(data.postnet),
    transfers: parseInt(data.transfers),
    expenses: parseInt(data.expenses),
  };
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
