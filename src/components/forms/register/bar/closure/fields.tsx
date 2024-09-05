import { SelectOption } from "@/types";
import ConsumptionsInput, { Consumptions } from "@/ui/consumptions";
import ControlledDatePicker from "@/ui/inputs/datePicker";
import { UploadImageInput } from "@/ui/inputs/image";
import { ControlledInput } from "@/ui/inputs/input";
import { ControlledSelect } from "@/ui/inputs/select";
import { ControlledTextArea } from "@/ui/inputs/textarea";
import { rulesAmount } from "@/utils/rules/amount";
import { CalendarDate } from "@nextui-org/react";
import { Dispatch, SetStateAction } from "react";
import { Control, FieldErrors } from "react-hook-form";

type PropsType = {
  date: CalendarDate;
  setDate: Dispatch<SetStateAction<CalendarDate>>;
  consumptions: Consumptions[];
  setConsumptions: Dispatch<SetStateAction<Consumptions[]>>;
  photo: string;
  setPhoto: Dispatch<SetStateAction<string>>;
  errors: FieldErrors<any>;
  control: Control<any, any>;
  registerBarOptions: SelectOption[] | undefined;
};

export default function RegisterBarClosureFields({
  date,
  setDate,
  consumptions,
  setConsumptions,
  photo,
  setPhoto,
  errors,
  control,
  registerBarOptions,
}: PropsType) {
  return (
    <>
      {" "}
      <ControlledDatePicker date={date} setDate={setDate} />
      {registerBarOptions && (
        <ControlledSelect
          size="md"
          rules={{ required: true }}
          options={registerBarOptions}
          control={control}
          label="Nombre de la barra"
          name="RegisterBarId"
          error={errors.RegisterBarId}></ControlledSelect>
      )}
      <ControlledInput
        error={errors.retirementTotal}
        control={control}
        rules={rulesAmount}
        name="retirementTotal"
        placeholder="Total de retiros ( parciales + final )"></ControlledInput>
      <ControlledInput
        error={errors.expensesTotal}
        control={control}
        rules={rulesAmount}
        name="expensesTotal"
        placeholder="Total de gastos"></ControlledInput>
      <ControlledTextArea
        error={errors.expensesObservations}
        control={control}
        rules={{
          required: false,
        }}
        name="expensesObservations"
        placeholder="Observaciones gastos"></ControlledTextArea>
      <ControlledInput
        error={errors.postnetTotal}
        control={control}
        rules={rulesAmount}
        name="postnetTotal"
        placeholder="Total postnet"></ControlledInput>
      <ControlledInput
        error={errors.transfersTotal}
        control={control}
        rules={rulesAmount}
        name="transfersTotal"
        placeholder="Total transferencias"></ControlledInput>
      <ControlledInput
        error={errors.transfersTotalSystem}
        control={control}
        rules={rulesAmount}
        name="transfersTotalSystem"
        placeholder="Total postnet/transf sistema"></ControlledInput>
      <ControlledInput
        error={errors.cashTotalSystem}
        control={control}
        rules={rulesAmount}
        name="cashTotalSystem"
        placeholder="Total efectivo sistema"></ControlledInput>
      <ConsumptionsInput
        consumptions={consumptions}
        setConsumptions={setConsumptions}></ConsumptionsInput>
      <ControlledTextArea
        error={errors.observations}
        control={control}
        rules={{
          required: false,
        }}
        name="observations"
        placeholder="Observaciones"></ControlledTextArea>
      <UploadImageInput photo={photo} setPhoto={setPhoto}></UploadImageInput>
    </>
  );
}
