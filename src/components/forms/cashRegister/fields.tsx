import ControlledDatePicker from "@/ui/inputs/datePicker";
import { ControlledInput } from "@/ui/inputs/input";
import { ControlledTextArea } from "@/ui/inputs/textarea";
import { rulesAmount } from "@/utils/rules/amount";
import { CalendarDate } from "@nextui-org/react";
import { Dispatch, SetStateAction } from "react";
import { Control, FieldErrors } from "react-hook-form";

type PropsType = {
  date: CalendarDate;
  setDate: Dispatch<SetStateAction<CalendarDate>>;
  errors: FieldErrors<any>;
  control: Control<any, any>;
};

export default function CashRegisterFields({
  date,
  setDate,
  errors,
  control,
}: PropsType) {
  return (
    <>
      <ControlledDatePicker date={date} setDate={setDate} />
      <ControlledInput
        error={errors.amountActual}
        control={control}
        rules={rulesAmount}
        name="amountActual"
        placeholder="Efectivo contado"></ControlledInput>
      <ControlledInput
        error={errors.earnedAccount}
        control={control}
        rules={rulesAmount}
        name="earnedAccount"
        placeholder="Cuenta ganado"></ControlledInput>
      <ControlledTextArea
        error={errors.comment}
        control={control}
        rules={{
          required: false,
        }}
        name="comment"
        placeholder="Comentarios"></ControlledTextArea>
    </>
  );
}
