"use client";

import {
  fetchCheckRegisterBarClosure,
  fetchCreateRegisterBarClosure,
} from "@/api/endpoints/register/bar/closure";
import { useGetRegisterBarsByBranchId } from "@/hooks/register/bar";
import { Consumptions } from "@/ui/consumptions";
import { formattedToday } from "@/utils/formatedToday";
import notify from "@/utils/notify";
import { parseDate } from "@internationalized/date";
import { Button } from "@nextui-org/button";
import { UUID } from "crypto";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { formatSubmitData } from "./auxiliar";
import RegisterBarClosureFields from "./fields";

const defaultValues = {
  RegisterBarId: undefined,
  retirementTotal: "",
  expensesTotal: "",
  postnetTotal: "",
  transfersTotal: "",
  transfersTotalSystem: "",
  cashTotalSystem: "",
  observations: "",
  expensesObservations: "",
};

export default function RegisterBarClosureForm({
  BranchId,
}: {
  BranchId: UUID;
}) {
  const { push } = useRouter();
  const [photo, setPhoto] = useState<string>("");
  const [date, setDate] = useState(parseDate(formattedToday));
  const [consumptions, setConsumptions] = useState<Consumptions[]>([]);
  const registerBarOptions = useGetRegisterBarsByBranchId(BranchId);

  const {
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting, isDirty },
  } = useForm({ defaultValues });

  async function onSubmit(data: FieldValues) {
    if (photo === "") return;

    data = formatSubmitData(data, date, consumptions, photo);

    const alreadyExist = await fetchCheckRegisterBarClosure({
      date: data.date,
      RegisterBarId: data.RegisterBarId,
    });

    if (alreadyExist) {
      notify("Ya se realizo el cierre de caja de ese dia", "error");
      return;
    }

    await fetchCreateRegisterBarClosure(data);
    notify("Cierre de caja creado con exito", "success");
    push("/");
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
