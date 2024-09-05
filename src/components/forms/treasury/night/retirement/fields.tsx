import { useGetRegisterBarsByBranchId } from "@/hooks/register/bar";
import { useGetRegisterTicketsByBranchId } from "@/hooks/register/ticket";
import ControlledDatePicker from "@/ui/inputs/datePicker";
import { ControlledInput } from "@/ui/inputs/input";
import { ControlledSelect } from "@/ui/inputs/select";
import { rulesAmount } from "@/utils/rules/amount";
import { CalendarDate } from "@nextui-org/react";
import { UUID } from "crypto";
import { Dispatch, SetStateAction } from "react";
import { FieldErrors, Control, UseFormWatch } from "react-hook-form";

type PropsType = {
  date: CalendarDate;
  setDate: Dispatch<SetStateAction<CalendarDate>>;
  errors: FieldErrors<any>;
  control: Control<any, any>;
  isTypeSelected: boolean;
  BranchId: UUID;
  watch: UseFormWatch<any>;
};

export default function TreasuryNightRetirementFields({
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
        size="md"
        rules={{ required: true }}
        options={[
          { value: "registerBar", label: "Barra" },
          { value: "registerTicket", label: "Boleteria" },
        ]}
        error={errors.type}
        control={control}
        label="Tipo de cierre"
        name="type"
      />
      {isTypeSelected && registerBarOptions && registerTicketOptions && (
        <>
          {watch("type") === "registerBar" && (
            <ControlledSelect
              size="md"
              error={errors.RegisterBarId}
              rules={{ required: true }}
              options={registerBarOptions}
              control={control}
              label="Nombre de la barra"
              name="RegisterBarId"
            />
          )}
          {watch("type") === "registerTicket" && (
            <ControlledSelect
              error={errors.RegisterTicketId}
              size="md"
              rules={{ required: true }}
              control={control}
              label="Nombre de la barra"
              options={registerTicketOptions}
              name="RegisterTicketId"
            />
          )}
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
