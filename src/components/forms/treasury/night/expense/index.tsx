"use client";
import { fetchCreateExpense } from "@/api/endpoints/treasury/night/expense";
import ModalComponent from "@/components/modal";
import { useGetConceptsByLevel } from "@/hooks/concept";
import { formattedToday } from "@/utils/formatedToday";
import notify from "@/utils/notify";
import { parseDate } from "@internationalized/date";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { formatSubmitData, handleAfterSubmit } from "./auxiliar";
import TreasuryNightExpenseFields from "./fields";
import { FormProps } from "@/types";
import ExpenseFields from "./fields";

const defaultValues = {
  conceptSelected: undefined,
  unitPrice: "",
  description: "",
  quantity: "",
};

export default function ExpenseForm({
  BranchId,
  isModal = false,
  isEdit = false,
  mutate,
  isOpen,
  onClose,
}: FormProps) {
  const { push } = useRouter();
  const [date, setDate] = useState(parseDate(formattedToday));
  const concepts = useGetConceptsByLevel("1", true);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid, isSubmitting, isDirty },
  } = useForm({ defaultValues });

  async function onSubmit(data: FieldValues) {
    data = formatSubmitData(data, date, concepts, BranchId);
    await fetchCreateExpense(data);
    notify("Gasto de tesoreria realizado con exito", "success");
    handleAfterSubmit(isModal, mutate, reset, onClose, push);
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

  return isModal ? (
    <ModalComponent
      title="Crear gasto nocturno"
      isOpen={isOpen}
      isLoading={isSubmitting}
      isDisabled={!isDirty && !isValid}
      handleClose={onClose}
      onClick={handleSubmit(onSubmit)}>
      {formContent}
    </ModalComponent>
  ) : (
    <div className="mt-8 flex flex-col gap-5 w-10/12 max-w-[350px]">
      {formContent}
      <Button
        onClick={handleSubmit(onSubmit)}
        className="w-full"
        isLoading={isSubmitting}
        isDisabled={!isDirty && !isValid}
        color="primary">
        {isSubmitting ? "" : "Cargar"}
      </Button>
    </div>
  );
}
