"use client";
import {
  fetchDeleteRetirementFinish,
  fetchEditRetirementFinish,
} from "@/api/endpoints/treasury/night/retirementFinish";
import ModalComponent from "@/components/modal";
import { RetirementFinish } from "@/types/models";
import { formattedToday } from "@/utils/formatedToday";
import notify from "@/utils/notify";
import { parseDate } from "@internationalized/date";
import { UUID } from "crypto";
import { Dispatch, SetStateAction, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { KeyedMutator } from "swr";
import { formatSubmitData } from "./auxiliar";
import TreasuryNightRetirementFinishFields from "./fields";
type PropsType = {
  onClose: () => void;
  isOpen: boolean;
  mutate: KeyedMutator<any>;
  rowSelected: RetirementFinish | null;
  setRowSelected: Dispatch<SetStateAction<RetirementFinish | null>>;
};
export default function RetirementFinishBOForm({
  onClose,
  isOpen,
  mutate,
  rowSelected,
  setRowSelected,
}: PropsType) {
  const [date, setDate] = useState(parseDate(formattedToday));

  const {
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors, isValid, isSubmitting, isDirty },
  } = useForm({
    defaultValues: {
      type: rowSelected?.type,
      RegisterBarId:
        rowSelected?.type === "registerBar"
          ? rowSelected?.RegisterBarId
          : undefined,
      RegisterTicketId:
        rowSelected?.type === "registerTicket"
          ? rowSelected?.RegisterTicketId
          : undefined,
      amount: rowSelected?.amount,
      postnetMP: rowSelected?.postnetMP,
      postnetBank: rowSelected?.postnetBank,
      transfers: rowSelected?.transfers,
      expenses: rowSelected?.expenses,
    },
  });

  async function onSubmit(data: FieldValues) {
    if (!rowSelected) return;
    data = formatSubmitData(data, date);
    await fetchEditRetirementFinish(rowSelected.id as UUID, data);
    mutate();
    reset();
    setRowSelected(null);
    onClose();
    notify("Retiro final nocturno actualizado con exito", "success");
  }

  async function handleDelete() {
    if (!rowSelected) return;
    await fetchDeleteRetirementFinish(rowSelected.id);
    mutate();
    reset();
    setRowSelected(null);
    onClose();
    notify("Retiro final nocturno elminado con exito", "success");
  }

  const isTypeSelected = watch("type") !== undefined;
  const formContent = (
    <TreasuryNightRetirementFinishFields
      {...{
        date,
        setDate,
        errors,
        isTypeSelected,
        watch,
        control,
        BranchId: rowSelected?.BranchId as UUID,
      }}
    />
  );
  return (
    <ModalComponent
      title="Editar retiro final nocturno"
      isOpen={isOpen}
      isLoading={isSubmitting}
      isDisabled={!isDirty && !isValid}
      handleClose={onClose}
      onDelete={handleDelete}
      onEdit={handleSubmit(onSubmit)}>
      {formContent}
    </ModalComponent>
  );
}
