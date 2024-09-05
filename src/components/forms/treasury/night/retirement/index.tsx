"use client";
import { fetchCreateRetirement } from "@/api/endpoints/treasury/night/retirement";
import ModalComponent from "@/components/modal";
import { formattedToday } from "@/utils/formatedToday";
import notify from "@/utils/notify";
import { parseDate } from "@internationalized/date";
import { Button } from "@nextui-org/button";
import { UUID } from "crypto";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { KeyedMutator } from "swr";
import { formatSubmitData, handleAfterSubmit } from "./auxiliar";
import TreasuryNightRetirementFields from "./fields";

const defaultValues = {
  type: undefined,
  RegisterBarId: undefined,
  RegisterTicketId: undefined,
  amount: "",
};

export default function TreasuryNightRetirementForm({
  BranchId,
  isModal = false,
  mutate,
  isOpen,
  onClose,
}: PropsType) {
  const { push } = useRouter();
  const [date, setDate] = useState(parseDate(formattedToday));

  const {
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors, isValid, isSubmitting, isDirty },
  } = useForm({ defaultValues });

  async function onSubmit(data: FieldValues) {
    try {
      data = formatSubmitData(data, date);
      await fetchCreateRetirement(data);
      notify("Retiro de caja realizado con exito", "success");
      handleAfterSubmit(isModal, mutate, reset, onClose, push);
    } catch (error) {
      console.error("error: ", error);
    }
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
        BranchId,
      }}
    />
  );
  return isModal ? (
    <ModalComponent
      title="Crear retiro nocturno"
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

type PropsType = {
  BranchId: UUID;
  isModal?: boolean;
  mutate?: KeyedMutator<any>;
  isOpen?: boolean;
  onClose?: () => void;
};
