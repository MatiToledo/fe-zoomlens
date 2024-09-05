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

export default function TreasuryCentralForm({
  BranchId,
  isOpen,
  onClose,
  mutate,
  rowSelected,
  setRowSelected,
}: PropsType) {
  const isEdit = !!rowSelected;
  let { identifier } = usePathnameData();
  identifier = formatIdentifier(identifier, isEdit);
  const [date, setDate] = useState(parseDate(formattedToday));
  const concepts = useGetConceptsByLevel("1", true);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid, isSubmitting, isDirty },
  } = useForm({
    defaultValues: {
      conceptSelected: isEdit ? rowSelected.ConceptName : undefined,
      type: isEdit ? rowSelected.type : undefined,
      amount: isEdit ? rowSelected.amount : "",
      description: isEdit ? rowSelected.description : "",
    },
  });

  async function onSubmit(data: FieldValues) {
    data.date = `${date.year}-${date.month}-${date.day}`;
    data.BranchId = BranchId;
    data.amount = parseInt(data.amount);
    data.ConceptId = concepts?.find(
      (concept) => concept.label === data.conceptSelected
    )?.value;
    delete data.conceptSelected;
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
      <ControlledSelect
        size="md"
        rules={{ required: true }}
        options={[
          { label: "Egreso", value: "expense" },
          { label: "Ingreso", value: "revenue" },
        ]}
        control={control}
        label="Tipo"
        name="type"
        error={errors.type}></ControlledSelect>
      {concepts && (
        <ControlledAutocomplete
          size="md"
          rules={{ required: true }}
          options={concepts}
          control={control}
          label="Concepto"
          name="conceptSelected"
          error={errors.conceptSelected}></ControlledAutocomplete>
      )}
      <ControlledInput
        error={errors.amount}
        control={control}
        rules={rulesAmount}
        name="amount"
        placeholder="Monto"></ControlledInput>
      <ControlledInput
        error={errors.description}
        control={control}
        rules={{
          required: true,
        }}
        name="description"
        placeholder="Descripcion"></ControlledInput>
    </ModalComponent>
  );
}
