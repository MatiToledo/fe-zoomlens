"use client";
import ModalComponent from "@/components/modal";
import { usePathnameData } from "@/hooks/backoffice";
import { useGetConceptsByLevel } from "@/hooks/concept";
import {
  TREASURY_CENTRAL_CREATE_FETCHERS,
  TREASURY_CENTRAL_DELETE_FETCHERS,
  TREASURY_CENTRAL_EDIT_FETCHERS,
  TREASURY_MODAL_TITLE,
} from "@/types/dictionaries";
import { ControlledAutocomplete } from "@/ui/inputs/autocomplete";
import ControlledDatePicker from "@/ui/inputs/datePicker";
import { ControlledInput } from "@/ui/inputs/input";
import { ControlledSelect } from "@/ui/inputs/select";
import { formattedToday } from "@/utils/formatedToday";
import notify from "@/utils/notify";
import { rulesAmount } from "@/utils/rules/amount";
import { parseDate } from "@internationalized/date";
import { UUID } from "crypto";
import { Dispatch, SetStateAction, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { KeyedMutator } from "swr";
import { formatIdentifier } from "./utils";
import { ControlledTextArea } from "@/ui/inputs/textarea";

const defaultValues = {
  conceptSelected: undefined,
  type: undefined,
  amount: "",
  description: "",
};

type PropsType = {
  mutate: KeyedMutator<any>;
  BranchId: UUID;
  isOpen: boolean;
  onClose: () => void;
  rowSelected?: any;
  setRowSelected?: Dispatch<SetStateAction<any>>;
};

export default function TreasuryCentralPostnetForm({
  BranchId,
  isOpen,
  onClose,
  mutate,
  rowSelected,
  setRowSelected,
}: PropsType) {
  const isEdit = !!rowSelected;
  let { identifier } = usePathnameData();
  console.log("identifier: ", identifier);
  identifier = formatIdentifier(identifier, isEdit);
  const [date, setDate] = useState(parseDate(formattedToday));

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid, isSubmitting, isDirty },
  } = useForm({
    defaultValues: {
      comment: isEdit ? rowSelected.comment : "",
      debit: isEdit ? rowSelected.debit : "",
      credit: isEdit ? rowSelected.credit : "",
      qr: isEdit ? rowSelected.qr : "",
    },
  });

  async function onSubmit(data: FieldValues) {
    data.date = `${date.year}-${date.month}-${date.day}`;
    data.BranchId = BranchId;
    data.debit = parseInt(data.debit);
    data.credit = parseInt(data.credit);
    data.qr = parseInt(data.qr);

    const fetcher = isEdit
      ? TREASURY_CENTRAL_EDIT_FETCHERS[
          identifier as keyof typeof TREASURY_CENTRAL_EDIT_FETCHERS
        ]
      : TREASURY_CENTRAL_CREATE_FETCHERS[
          identifier as keyof typeof TREASURY_CENTRAL_CREATE_FETCHERS
        ];
    isEdit ? await fetcher(rowSelected.id, data) : await fetcher(data);
    notify(
      `Movimiento ${isEdit ? "actualizado" : "creado"} con exito`,
      "success"
    );
    mutate();
    onClose();
    reset();
  }

  async function handleDelete() {
    if (!rowSelected || !setRowSelected) return;
    const fetcher =
      TREASURY_CENTRAL_DELETE_FETCHERS[
        identifier as keyof typeof TREASURY_CENTRAL_DELETE_FETCHERS
      ];
    await fetcher(rowSelected.id);
    mutate();
    reset();
    setRowSelected(null);
    onClose();
    notify("Gasto de tesoreria elminado con exito", "success");
  }

  return (
    <ModalComponent
      title={`${isEdit ? "Editar" : "Crear"} movimiento de ${
        TREASURY_MODAL_TITLE[identifier as keyof typeof TREASURY_MODAL_TITLE]
      }`}
      isOpen={isOpen}
      isLoading={isSubmitting}
      isDisabled={!isDirty && !isValid}
      handleClose={onClose}
      onDelete={isEdit ? handleDelete : undefined}
      onEdit={isEdit && handleSubmit(onSubmit)}
      onCreate={!isEdit && handleSubmit(onSubmit)}>
      <ControlledDatePicker date={date} setDate={setDate} />

      <ControlledInput
        error={errors.debit}
        control={control}
        rules={rulesAmount}
        name="debit"
        placeholder="Debito"></ControlledInput>
      <ControlledInput
        error={errors.credit}
        control={control}
        rules={{
          required: true,
        }}
        name="credit"
        placeholder="Credito"></ControlledInput>
      <ControlledInput
        error={errors.qr}
        control={control}
        rules={{
          required: true,
        }}
        name="qr"
        placeholder="QR"></ControlledInput>
      <ControlledTextArea
        error={errors.comment}
        control={control}
        rules={{ required: false }}
        name="comment"
        placeholder="Comentario"></ControlledTextArea>
    </ModalComponent>
  );
}
