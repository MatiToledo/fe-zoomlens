"use client";
import {
  fetchDeleteRegisterTicketClosure,
  fetchEditRegisterTicketClosure,
} from "@/api/endpoints/register/ticket/closure";
import ModalComponent from "@/components/modal";
import { useGetRegisterTicketsByBranchId } from "@/hooks/register/ticket";
import { RegisterTicketClosure } from "@/types/models";
import { Tickets } from "@/ui/tickets";
import { formattedToday } from "@/utils/formatedToday";
import notify from "@/utils/notify";
import { parseDate } from "@internationalized/date";
import { Dispatch, SetStateAction, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { KeyedMutator } from "swr";
import RegisterTicketClosureFields from "./fields";
import { formatSubmitData } from "./auxiliar";

type PropsType = {
  onClose: () => void;
  isOpen: boolean;
  mutate: KeyedMutator<any>;
  rowSelected: RegisterTicketClosure;
  setRowSelected: Dispatch<SetStateAction<RegisterTicketClosure | null>>;
};

export default function RegisterTicketClosureBOForm({
  onClose,
  isOpen,
  mutate,
  rowSelected,
  setRowSelected,
}: PropsType) {
  const [photo, setPhoto] = useState<string>(rowSelected.photo);
  const [date, setDate] = useState(parseDate(formattedToday));
  const [tickets, setTickets] = useState<Tickets[]>(rowSelected.tickets);
  const registerTicketsOptions = useGetRegisterTicketsByBranchId(
    rowSelected.BranchId
  );
  const defaultValues = {
    RegisterTicketId: rowSelected.RegisterTicketId,
    expensesTotal: rowSelected.expensesTotal,
    observations: rowSelected.observations,
    expensesObservations: rowSelected.expensesObservations,
    personsCantBar: rowSelected.personsCantBar,
    personsCantBranch: rowSelected.personsCantBranch,
    postnetTotal: rowSelected.postnetTotal,
    retirementTotal: rowSelected.retirementTotal,
    soldTotal: rowSelected.soldTotal,
    totalEarnedAccount: rowSelected.totalEarnedAccount,
    earnedAccountBar: rowSelected.earnedAccountBar,
    transfersTotal: rowSelected.transfersTotal,
  };
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid, isSubmitting, isDirty },
  } = useForm({ defaultValues });

  async function onSubmit(data: FieldValues) {
    data = formatSubmitData(data, date, tickets, photo);
    await fetchEditRegisterTicketClosure(rowSelected.id, data);
    mutate();
    reset();
    setRowSelected(null);
    onClose();
    notify("Cierre de boleteria actualizado con exito", "success");
  }

  async function handleDelete() {
    await fetchDeleteRegisterTicketClosure(rowSelected.id);
    mutate();
    reset();
    setRowSelected(null);
    onClose();
    notify("Cierre de boleteria eliminado con exito", "success");
  }

  const formContent = (
    <RegisterTicketClosureFields
      {...{
        date,
        setDate,
        tickets,
        setTickets,
        photo,
        setPhoto,
        registerTicketsOptions,
        errors,
        control,
      }}
    />
  );

  return (
    <ModalComponent
      title="Crear retiro nocturno"
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
