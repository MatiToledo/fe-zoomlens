import getInitialsDate from "@/utils/getInitialsDate";
import { DatePicker } from "@nextui-org/date-picker";
import { Calendar, CalendarDate } from "@nextui-org/react";
import { I18nProvider } from "@react-aria/i18n";
import { Dispatch, SetStateAction } from "react";
import { parseDate } from "@internationalized/date";

export default function ControlledCalendar({
  date,
  setDate,
}: {
  date: CalendarDate;
  setDate: Dispatch<SetStateAction<CalendarDate>>;
}) {
  return (
    <I18nProvider locale="es-ES">
      <Calendar
        classNames={{
          gridWrapper: "hidden",
          headerWrapper: "p-3",
        }}
        onFocusChange={setDate}
        defaultValue={date}
        className="max-w-md text-left"
        minValue={parseDate("2024-08-01")}
        maxValue={parseDate(getInitialsDate("end"))}
      />
    </I18nProvider>
  );
}
