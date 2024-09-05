import { useGetRegisterBarsByBranchId } from "@/hooks/register/bar";
import { useGetRegisterTicketsByBranchId } from "@/hooks/register/ticket";
import ControlledDatePicker from "@/ui/inputs/datePicker";
import { ControlledInput } from "@/ui/inputs/input";
import { ControlledSelect } from "@/ui/inputs/select";
import { rulesAmount } from "@/utils/rules/amount";
import { CalendarDate } from "@nextui-org/react";
import { UUID } from "crypto";
import { Dispatch, SetStateAction } from "react";
import { Control, FieldErrors, UseFormWatch } from "react-hook-form";

type PropsType = {
  date: CalendarDate;
  setDate: Dispatch<SetStateAction<CalendarDate>>;
  errors: FieldErrors<any>;
  control: Control<any, any>;
  isTypeSelected: boolean;
  BranchId: UUID;
  watch: UseFormWatch<any>;
};

export default function TreasuryNightRetirementFinishFields({
  date,
  setDate,
  errors,
  control,
  isTypeSelected,
  BranchId,
  watch,
}: PropsType) {
  const registerBarOptions = useGetRegisterBarsByBranchId(BranchId);
  const registerTicketOptions = useGetRegisterTicketsByBranchId(BranchId);
  return (
    <>
      <ControlledDatePicker date={date} setDate={setDate} />
      <ControlledSelect
        error={errors.type}
        size="md"
        rules={{ required: true }}
        options={[
          { value: "registerBar", label: "Barra" },
          { value: "registerTicket", label: "Boleteria" },
        ]}
        control={control}
        label="Tipo de cierre"
        name="type"
      />
      {isTypeSelected && registerBarOptions && registerTicketOptions && (
        <>
          {watch("type") === "registerBar" && (
            <ControlledSelect
              size="md"
              rules={{ required: true }}
              options={registerBarOptions}
              control={control}
              label="Nombre de la barra"
              name="RegisterBarId"
              error={errors.RegisterBarId}
            />
          )}
          {watch("type") === "registerTicket" && (
            <ControlledSelect
              error={errors.RegisterTicketId}
              rules={{ required: true }}
              control={control}
              label="Nombre de la barra"
              options={registerTicketOptions}
              name="RegisterTicketId"
            />
          )}
          <ControlledInput
            error={errors.postnet}
            control={control}
            rules={rulesAmount}
            name="postnetMP"
            placeholder="Postnet Mercado Pago"
          />
          <ControlledInput
            error={errors.postnet}
            control={control}
            rules={rulesAmount}
            name="postnetBank"
            placeholder="Postnet Banco"
          />
          <ControlledInput
            error={errors.transfers}
            control={control}
            rules={rulesAmount}
            name="transfers"
            placeholder="Trasnsferencias"
          />
          <ControlledInput
            error={errors.expenses}
            control={control}
            rules={rulesAmount}
            name="expenses"
            placeholder="Gastos de barras"
          />
          <ControlledInput
            error={errors.amount}
            control={control}
            rules={rulesAmount}
            name="amount"
            placeholder="Monto"
          />
        </>
      )}
    </>
  );
}
