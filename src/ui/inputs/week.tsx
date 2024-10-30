import getWeekOfMonth from "@/utils/getWeekOfMonth";
import { startOfWeek } from "@internationalized/date";
import { Button, ButtonGroup, Calendar, CalendarDate } from "@nextui-org/react";
import { I18nProvider, useLocale } from "@react-aria/i18n";
import { Dispatch, SetStateAction } from "react";

export default function ControlledWeek({
  date,
  setDate,
}: {
  date: CalendarDate;
  setDate: Dispatch<SetStateAction<CalendarDate>>;
}) {
  let { locale } = useLocale();

  let lastWeek = startOfWeek(date.subtract({ weeks: 1 }), locale);
  let nextWeek = startOfWeek(date.add({ weeks: 1 }), locale);
  const weekOfMonth = getWeekOfMonth(date);
  return (
    <I18nProvider locale="es-ES">
      <Calendar
        classNames={{
          gridWrapper: "hidden",
        }}
        bottomContent={
          <ButtonGroup
            fullWidth
            className="px-3 pb-2 pt-3 bg-content1 [&>button]:text-default-500 [&>button]:border-default-200/60"
            radius="full"
            size="sm"
            variant="bordered">
            <Button
              className="text-default-500 text-small font-medium"
              onPress={() => setDate(lastWeek)}>
              Anterior{" "}
            </Button>
            <Button className="text-default-500 text-small font-medium">
              Semana {weekOfMonth}
            </Button>
            <Button
              className="text-default-500 text-small font-medium"
              onPress={() => setDate(nextWeek)}>
              Siguiente
            </Button>
          </ButtonGroup>
        }
        focusedValue={date}
        onFocusChange={setDate}
        defaultValue={date}
        className="max-w-md text-left"
      />
    </I18nProvider>
  );
}
