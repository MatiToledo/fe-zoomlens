import { Consumptions } from "@/ui/consumptions";
import { CalendarDate } from "@nextui-org/react";
import { FieldValues } from "react-hook-form";

export function formatSubmitData(
  data: FieldValues,
  date: CalendarDate,
  consumptions: Consumptions[],
  photo: string
) {
  data.date = `${date.year}-${date.month}-${date.day}`;
  data.consumptions = consumptions;
  data.photo = photo;
  data.retirementTotal = Number(data.retirementTotal);
  data.expensesTotal = Number(data.expensesTotal);
  data.postnetTotal = Number(data.postnetTotal);
  data.transfersTotal = Number(data.transfersTotal);
  data.transfersTotalSystem = Number(data.transfersTotalSystem);
  data.cashTotalSystem = Number(data.cashTotalSystem);
  return data;
}
