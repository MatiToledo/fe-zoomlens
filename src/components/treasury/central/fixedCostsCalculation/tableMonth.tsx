import { MONTHS_DICTIONARIES } from "@/types/dictionaries";
import ControlledCalendar from "@/ui/inputs/calendar";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

export default function TableMonth({
  month,
  weekendCount,
  weekends,
  date,
  setDate,
}: any) {
  return (
    <Table
      classNames={{
        base: "max-w-[500px] min-w-[290px] ",
        wrapper: `items-center`,
        td: " p-2",
      }}
      topContent={
        <ControlledCalendar date={date} setDate={setDate}></ControlledCalendar>
      }>
      <TableHeader>
        <TableColumn align="center" key="month">
          Mes
        </TableColumn>
        <TableColumn align="center" key="weekendCount">
          Fines de semana
        </TableColumn>
        <TableColumn align="center" key="weekends">
          Dias
        </TableColumn>
      </TableHeader>
      <TableBody>
        <TableRow key={"row"}>
          <TableCell>{MONTHS_DICTIONARIES[month]}</TableCell>
          <TableCell>{weekendCount}</TableCell>
          <TableCell>
            {weekends.map(
              (weekend: any, index: number) =>
                weekend.friday.split("/")[0] +
                "-" +
                weekend.saturday.split("/")[0] +
                (index === weekends.length - 1 ? "" : " / ")
            )}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
