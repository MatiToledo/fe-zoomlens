import { DateRangePicker } from "@nextui-org/react";
import { I18nProvider } from "@react-aria/i18n";
import { Dispatch, SetStateAction } from "react";

export default function ControlledDateRangePicker({
  date,
  setDate,
}: {
  date: any;
  setDate: Dispatch<SetStateAction<any>>;
}) {
  return (
    <I18nProvider locale="es-ES">
      <DateRangePicker
        key={`date_range_${date.start}_${date.end}`}
        size="sm"
        label="Rango de fechas"
        fullWidth
        visibleMonths={1}
        value={date}
        onChange={setDate}
        defaultValue={date as any}
      />
    </I18nProvider>
  );
}
