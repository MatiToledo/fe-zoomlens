import { SelectOption } from "@/types";
import { ControlledAutocomplete } from "@/ui/inputs/autocomplete";
import ControlledDatePicker from "@/ui/inputs/datePicker";
import { ControlledInput } from "@/ui/inputs/input";
import { rulesAmount } from "@/utils/rules/amount";
import { CalendarDate } from "@nextui-org/react";
import { Dispatch, SetStateAction } from "react";
import { Control, FieldErrors } from "react-hook-form";

type PropsType = {
  date: CalendarDate;
  setDate: Dispatch<SetStateAction<CalendarDate>>;
  errors: FieldErrors<any>;
  control: Control<any, any>;
  concepts: SelectOption[] | undefined;
};

export default function ExpenseFields({
  date,
  setDate,
  errors,
  control,
  concepts,
}: PropsType) {
  return (
    <>
      <ControlledDatePicker date={date} setDate={setDate} />
      {concepts && (
        <ControlledAutocomplete
          size="md"
          error={errors.conceptSelected}
          rules={{ required: true }}
          options={concepts}
          control={control}
          label="Concepto"
          name="conceptSelected"
        />
      )}
      <ControlledInput
        error={errors.description}
        control={control}
        rules={{
          required: true,
        }}
        name="description"
        placeholder="Descripción"
      />
      <ControlledInput
        error={errors.quantity}
        control={control}
        rules={rulesAmount}
        name="quantity"
        placeholder="Cantidad"
      />
      <ControlledInput
        error={errors.unitPrice}
        control={control}
        rules={rulesAmount}
        name="unitPrice"
        placeholder="Precio unitario"
      />
    </>
  );
}
