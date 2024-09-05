"use client";
import {
  fetchDeleteCashRegister,
  fetchEditCashRegister,
} from "@/api/endpoints/cashRegister";
import ModalComponent from "@/components/modal";
import { CashRegister } from "@/types/models";
import { formattedToday } from "@/utils/formatedToday";
import notify from "@/utils/notify";
import { parseDate } from "@internationalized/date";
import { Dispatch, SetStateAction, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { KeyedMutator } from "swr";
import { formatSubmitData } from "./auxiliar";
import CashRegisterFields from "./fields";

type PropsType = {
  onClose: () => void;
  isOpen: boolean;
  mutate: KeyedMutator<any>;
  rowSelected: CashRegister | null;
  setRowSelected: Dispatch<SetStateAction<CashRegister | null>>;
};

export default function CashRegisterBOForm({
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
    reset,
    formState: { errors, isValid, isSubmitting, isDirty },
  } = useForm({
    defaultValues: {
      amountActual: rowSelected?.amountActual,
      amountTheoretical: rowSelected?.amountTheoretical,
      retirementsTotal: rowSelected?.retirementsTotal,
      retirementsFinishTotal: rowSelected?.retirementsFinishTotal,
      retirementsFinishExpensesTotal:
        rowSelected?.retirementsFinishExpensesTotal,
      treasuryExpensesTotal: rowSelected?.treasuryExpensesTotal,
      expensesTotal: rowSelected?.expensesTotal,
      cashTotal: rowSelected?.cashTotal,
      transfersTotal: rowSelected?.transfersTotal,
      postnetTotal: rowSelected?.postnetTotal,
      difference: rowSelected?.difference,
      earnedAccount: rowSelected?.earnedAccount,
      comment: rowSelected?.comment,
    },
  });

  async function onSubmit(data: FieldValues) {
    if (!rowSelected) return;
    data = formatSubmitData(data, date, rowSelected.BranchId);
    await fetchEditCashRegister(rowSelected.id, data);
    mutate();
    reset();
    setRowSelected(null);
    onClose();
    notify("Cierre de tesoreria actualizado con exito", "success");
  }

  async function handleDelete() {
    if (!rowSelected) return;
    await fetchDeleteCashRegister(rowSelected.id);
    mutate();
    reset();
    setRowSelected(null);
    onClose();
    notify("Cierre de tesoreria elminado con exito", "success");
  }

  const formContent = (
    <CashRegisterFields
      {...{
        date,
        setDate,
        errors,
        control,
      }}
    />
  );

  return (
    <ModalComponent
      title="Editar cierre de tesoreria"
      isOpen={isOpen}
      isLoading={isSubmitting}
      isDisabled={!isDirty && !isValid}
      handleClose={onClose}
      onEdit={handleSubmit(onSubmit)}
      onDelete={handleDelete}>
      {formContent}
    </ModalComponent>
  );
}
