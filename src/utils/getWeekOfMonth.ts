import { CalendarDate } from "@nextui-org/react";

export default function getWeekOfMonth(date: CalendarDate) {
  const firstDayOfMonth = date.set({ day: 1 });

  const daysSinceFirstDay =
    date.day -
    firstDayOfMonth.day +
    (date.month === firstDayOfMonth.month ? 0 : 0);

  const weekOfMonth = Math.floor(daysSinceFirstDay / 7) + 1;
  return weekOfMonth;
}
