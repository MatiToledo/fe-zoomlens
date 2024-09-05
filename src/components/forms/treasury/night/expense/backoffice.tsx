"use client";
import {
  fetchDeleteExpense,
  fetchEditExpense,
} from "@/api/endpoints/treasury/night/expense";
import ModalComponent from "@/components/modal";
import { useGetConceptsByLevel } from "@/hooks/concept";
import { Expense } from "@/types/models";
import { formattedToday } from "@/utils/formatedToday";
import notify from "@/utils/notify";
import { parseDate } from "@internationalized/date";
import { Dispatch, SetStateAction, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { KeyedMutator } from "swr";
import { formatSubmitData } from "./auxiliar";
import ExpenseFields from "./fields";

type PropsType = {
  onClose: () => void;
  isOpen: boolean;
  mutate: KeyedMutator<any>;
  rowSelected: Expense | null;
  setRowSelected: Dispatch<SetStateAction<Expense | null>>;
};

export default function ExpenseBOForm({
  onClose,
  isOpen,
  mutate,
  rowSelected,
  setRowSelected,
}: PropsType) {
  const [date, setDate] = useState(parseDate(formattedToday));
  const concepts = useGetConceptsByLevel("1", true);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid, isSubmitting, isDirty },
  } = useForm({
    defaultValues: {
      conceptSelected: rowSelected?.ConceptName,
      unitPrice: rowSelected?.unitPrice,
      description: rowSelected?.description,
      quantity: rowSelected?.quantity,
    },
  });

  async function onSubmit(data: FieldValues) {
    if (!rowSelected) return;
    data = formatSubmitData(data, date, concepts, rowSelected.BranchId);
    await fetchEditExpense(rowSelected.id, data);
    mutate();
    reset();
    setRowSelected(null);
    onClose();
    notify("Gasto de tesoreria actualizado con exito", "success");
  }

  async function handleDelete() {
    if (!rowSelected) return;
    await fetchDeleteExpense(rowSelected.id);
    mutate();
    reset();
    setRowSelected(null);
    onClose();
    notify("Gasto de tesoreria elminado con exito", "success");
  }

  const formContent = (
    <ExpenseFields
      {...{
        date,
        setDate,
        errors,
        control,
        concepts,
      }}
    />
  );

  return (
    <ModalComponent
      title="Editar gasto nocturno"
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
