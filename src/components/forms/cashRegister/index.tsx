"use client";
import {
  fetchCheckCashRegister,
  fetchCreateCashRegister,
} from "@/api/endpoints/cashRegister";
import ModalComponent from "@/components/modal";
import { useGetCashRegisterMovements } from "@/hooks/cashRegister";
import { CashRegister } from "@/types/models";
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
import CashRegisterFields from "./fields";
import CashRegisterPDF from "./pdf";
import useGetTreasuryNightResume from "@/hooks/treasury/night";
import { user } from "@nextui-org/react";

export default function CashRegisterForm({
  isModal = false,
  BranchId,
  mutate,
  CompanyName,
  BranchName,
  isOpen,
  onClose,
}: PropsType) {
  const { push } = useRouter();
  const [date, setDate] = useState(parseDate(formattedToday));
  const [result, setResult] = useState<CashRegister>();
  const { data, isLoading } = useGetTreasuryNightResume(BranchId, date);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid, isSubmitting, isDirty },
  } = useForm();

  async function onSubmit(data: FieldValues) {
    data = formatSubmitData(data, date, BranchId);

    const alreadyExist = await fetchCheckCashRegister({
      date: data.date,
      BranchId,
    });
    if (alreadyExist) {
      notify("Ya se realizo el cierre de caja de ese dia", "error");
      if (isModal && onClose) onClose();
      return;
    }
    const cashRegister = await fetchCreateCashRegister(data);
    notify("Retiro de caja realizado con exito", "success");
    setResult(cashRegister);
    handleAfterSubmit(isModal, mutate, reset, onClose, push);
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
    <>
      {isModal ? (
        <ModalComponent
          title="Crear cierre de caja"
          isOpen={isOpen}
          isLoading={isSubmitting}
          isDisabled={!isDirty && !isValid}
          handleClose={onClose}
          onCreate={handleSubmit(onSubmit)}>
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
      )}
      {result && (
        <CashRegisterPDF
          result={result}
          tables={data}
          date={date}
          CompanyName={CompanyName}
          BranchName={BranchName}></CashRegisterPDF>
      )}
    </>
  );
}

type PropsType = {
  BranchId: UUID;
  isModal?: boolean;
  mutate?: KeyedMutator<any>;
  isOpen?: boolean;
  onClose?: () => void;
  BranchName: string;
  CompanyName: string;
};
