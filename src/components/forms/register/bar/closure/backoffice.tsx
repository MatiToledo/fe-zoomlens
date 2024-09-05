"use client";

import {
  fetchDeleteRegisterBarClosure,
  fetchEditRegisterBarClosure,
} from "@/api/endpoints/register/bar/closure";
import ModalComponent from "@/components/modal";
import { useGetRegisterBarsByBranchId } from "@/hooks/register/bar";
import { RegisterBarClosure } from "@/types/models";
import { Consumptions } from "@/ui/consumptions";
import { formattedToday } from "@/utils/formatedToday";
import notify from "@/utils/notify";
import { parseDate } from "@internationalized/date";
import { Dispatch, SetStateAction, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { KeyedMutator } from "swr";
import RegisterBarClosureFields from "./fields";
import { formatSubmitData } from "./auxiliar";

type PropsType = {
  onClose: () => void;
  isOpen: boolean;
  mutate: KeyedMutator<any>;
  rowSelected: RegisterBarClosure;
  setRowSelected: Dispatch<SetStateAction<RegisterBarClosure | null>>;
};

export default function RegisterBarClosureBOForm({
  onClose,
  isOpen,
  mutate,
  rowSelected,
  setRowSelected,
}: PropsType) {
  const [photo, setPhoto] = useState<string>(rowSelected.photo);
  const [date, setDate] = useState(parseDate(formattedToday));
  const [consumptions, setConsumptions] = useState<Consumptions[]>(
    rowSelected.consumptions
  );
  const registerBarOptions = useGetRegisterBarsByBranchId(rowSelected.BranchId);
  const defaultValues = {
    RegisterBarId: rowSelected.RegisterBarId,
    retirementTotal: rowSelected.retirementTotal,
    expensesTotal: rowSelected.expensesTotal,
    postnetTotal: rowSelected.postnetTotal,
    transfersTotal: rowSelected.transfersTotal,
    transfersTotalSystem: rowSelected.transfersTotalSystem,
    cashTotalSystem: rowSelected.cashTotalSystem,
    observations: rowSelected.observations,
    expensesObservations: rowSelected.expensesObservations,
  };
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid, isSubmitting, isDirty },
  } = useForm({ defaultValues });

  async function onSubmit(data: FieldValues) {
    data = formatSubmitData(data, date, consumptions, photo);
    await fetchEditRegisterBarClosure(rowSelected.id, data);
    mutate();
    reset();
    setRowSelected(null);
    onClose();
    notify("Cierre de caja actualizado con exito", "success");
  }

  async function handleDelete() {
    await fetchDeleteRegisterBarClosure(rowSelected.id);
    mutate();
    reset();
    setRowSelected(null);
    onClose();
    notify("Cierre de caja eliminado con exito", "success");
  }

  const formContent = (
    <RegisterBarClosureFields
      {...{
        date,
        setDate,
        consumptions,
        setConsumptions,
        photo,
        setPhoto,
        registerBarOptions,
        errors,
        control,
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
