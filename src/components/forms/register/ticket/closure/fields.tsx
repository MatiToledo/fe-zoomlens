import { SelectOption } from "@/types";
import ControlledDatePicker from "@/ui/inputs/datePicker";
import { UploadImageInput } from "@/ui/inputs/image";
import { ControlledInput } from "@/ui/inputs/input";
import { ControlledSelect } from "@/ui/inputs/select";
import { ControlledTextArea } from "@/ui/inputs/textarea";
import TicketsInput, { Tickets } from "@/ui/tickets";
import { rulesAmount } from "@/utils/rules/amount";
import { CalendarDate } from "@nextui-org/react";
import { Dispatch, SetStateAction } from "react";
import { Control, FieldErrors } from "react-hook-form";

type PropsType = {
  date: CalendarDate;
  setDate: Dispatch<SetStateAction<CalendarDate>>;
  tickets: Tickets[];
  setTickets: Dispatch<SetStateAction<Tickets[]>>;
  photo: string;
  setPhoto: Dispatch<SetStateAction<string>>;
  errors: FieldErrors<any>;
  control: Control<any, any>;
  registerTicketsOptions: SelectOption[] | undefined;
};

export default function RegisterTicketClosureFields({
  date,
  setDate,
  tickets,
  setTickets,
  photo,
  setPhoto,
  errors,
  control,
  registerTicketsOptions,
}: PropsType) {
  return (
    <>
      <ControlledDatePicker date={date} setDate={setDate} />
      {registerTicketsOptions && (
        <ControlledSelect
          size="md"
          rules={{ required: true }}
          options={registerTicketsOptions}
          control={control}
          label="Nombre de la boleteria"
          name="RegisterTicketId"
          error={errors.RegisterTicketId}></ControlledSelect>
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
        error={errors.soldTotal}
        control={control}
        rules={rulesAmount}
        name="soldTotal"
        placeholder="Total vendido"></ControlledInput>
      <TicketsInput tickets={tickets} setTickets={setTickets}></TicketsInput>
      <ControlledInput
        error={errors.totalEarnedAccount}
        control={control}
        rules={rulesAmount}
        name="totalEarnedAccount"
        placeholder="Cuenta ganado total"></ControlledInput>
      <ControlledInput
        error={errors.earnedAccountBar}
        control={control}
        rules={rulesAmount}
        name="earnedAccountBar"
        placeholder="Cuenta ganado cierre bar"></ControlledInput>
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
