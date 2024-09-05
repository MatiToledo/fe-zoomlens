"use client";

import {
  fetchCheckRegisterTicketClosure,
  fetchCreateRegisterTicketClosure,
} from "@/api/endpoints/register/ticket/closure";
import { useGetRegisterTicketsByBranchId } from "@/hooks/register/ticket";
import ControlledDatePicker from "@/ui/inputs/datePicker";
import { UploadImageInput } from "@/ui/inputs/image";
import { ControlledInput } from "@/ui/inputs/input";
import { ControlledSelect } from "@/ui/inputs/select";
import { ControlledTextArea } from "@/ui/inputs/textarea";
import TicketsInput, { Tickets } from "@/ui/tickets";
import { formattedToday } from "@/utils/formatedToday";
import notify from "@/utils/notify";
import { rulesAmount } from "@/utils/rules/amount";
import { parseDate } from "@internationalized/date";
import { Button } from "@nextui-org/button";
import { UUID } from "crypto";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { formatSubmitData } from "./auxiliar";
import RegisterTicketClosureFields from "./fields";

const defaultValues = {
  RegisterTicketId: undefined,
  expensesTotal: "",
  observations: "",
  expensesObservations: "",
  personsCantBar: "",
  personsCantBranch: "",
  postnetTotal: "",
  retirementTotal: "",
  soldTotal: "",
  totalEarnedAccount: "",
  earnedAccountBar: "",
  transfersTotal: "",
};

export default function RegisterTicketClosureForm({
  BranchId,
}: {
  BranchId: UUID;
}) {
  const { push } = useRouter();
  const [photo, setPhoto] = useState<string>("");
  const [date, setDate] = useState(parseDate(formattedToday));
  const [tickets, setTickets] = useState<Tickets[]>([]);
  const registerTicketsOptions = useGetRegisterTicketsByBranchId(BranchId);

  const {
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting, isDirty },
  } = useForm({ defaultValues });

  async function onSubmit(data: FieldValues) {
    if (photo === "") return;
    data = formatSubmitData(data, date, tickets, photo);
    const alreadyExist = await fetchCheckRegisterTicketClosure({
      date: data.date,
      RegisterTicketId: data.RegisterTicketId,
    });

    if (alreadyExist) {
      notify("Ya se realizo el cierre de boleteria de ese dia", "error");
      return;
    }
    await fetchCreateRegisterTicketClosure(data);
    notify("Cierre de boleteria creado con exito", "success");
    push("/");
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
