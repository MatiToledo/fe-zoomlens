import { Consumptions } from "@/ui/consumptions";
import { Tickets } from "@/ui/tickets";
import { CalendarDate } from "@nextui-org/react";
import { FieldValues } from "react-hook-form";

export function formatSubmitData(
  data: FieldValues,
  date: CalendarDate,
  tickets: Tickets[],
  photo: string
) {
  data.date = `${date.year}-${date.month}-${date.day}`;
  data.tickets = tickets;
  data.photo = photo;
  data.expensesTotal = Number(data.expensesTotal);
  data.personsCantBar = Number(data.personsCantBar);
  data.personsCantBranch = Number(data.personsCantBranch);
  data.postnetTotal = Number(data.postnetTotal);
  data.retirementTotal = Number(data.retirementTotal);
  data.soldTotal = Number(data.soldTotal);
  data.totalEarnedAccount = Number(data.totalEarnedAccount);
  data.earnedAccountBar = Number(data.earnedAccountBar);
  data.transfersTotal = Number(data.transfersTotal);

  return data;
}
