import { DatePicker } from "@nextui-org/date-picker";
import { CalendarDate } from "@nextui-org/react";
import { I18nProvider } from "@react-aria/i18n";
import { Dispatch, SetStateAction } from "react";

export default function ControlledDatePicker({
  date,
  setDate,
}: {
  date: CalendarDate;
  setDate: Dispatch<SetStateAction<CalendarDate>>;
}) {
  return (
    <I18nProvider locale="es-ES">
      <DatePicker
        label={"Fecha"}
        onChange={setDate}
        defaultValue={date}
        className="max-w-md text-left"
      />
    </I18nProvider>
  );
}
