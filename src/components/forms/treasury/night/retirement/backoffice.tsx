"use client";
import {
  fetchCreateRetirement,
  fetchDeleteRetirement,
  fetchEditRetirement,
} from "@/api/endpoints/treasury/night/retirement";
import ModalComponent from "@/components/modal";
import { Retirement } from "@/types/models";
import { formattedToday } from "@/utils/formatedToday";
import notify from "@/utils/notify";
import { parseDate } from "@internationalized/date";
import { UUID } from "crypto";
import { Dispatch, SetStateAction, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { KeyedMutator } from "swr";
import { formatSubmitData } from "./auxiliar";
import TreasuryNightRetirementFields from "./fields";
type PropsType = {
  onClose: () => void;
  isOpen: boolean;
  mutate: KeyedMutator<any>;
  rowSelected: Retirement | null;
  setRowSelected: Dispatch<SetStateAction<Retirement | null>>;
};
export default function RetirementBOForm({
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
    },
  });

  async function onSubmit(data: FieldValues) {
    if (!rowSelected) return;
    data = formatSubmitData(data, date);
    await fetchEditRetirement(rowSelected.id as UUID, data);
    mutate();
    reset();
    setRowSelected(null);
    onClose();
    notify("Retiro de caja realizado con exito", "success");
  }

  async function handleDelete() {
    if (!rowSelected) return;
    await fetchDeleteRetirement(rowSelected.id);
    mutate();
    reset();
    setRowSelected(null);
    onClose();
    notify("Gasto de tesoreria elminado con exito", "success");
  }

  const isTypeSelected = watch("type") !== undefined;
  const formContent = (
    <TreasuryNightRetirementFields
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
      title="Editar retiro nocturno"
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
