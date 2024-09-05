import { FIXED_COST_TYPE_DICTIONARY } from "@/types/dictionaries";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

export default function TableTotal({ data }: any) {
  data.total = { "-": "Total", ...data.total };
  data.pay = { "-": "Pagado", ...data.pay };
  return (
    <Table
      classNames={{
        base: "max-w-[500px] min-w-[290px]",
        wrapper: `items-center min-h-[141px]`,
      }}>
      <TableHeader>
        {Object.keys(data.total).map((key: any) => (
          <TableColumn align="center" key={key}>
            {key}
          </TableColumn>
        ))}
      </TableHeader>
      <TableBody>
        <TableRow key={"row1"}>
          {Object.values(data.total).map((key: any) => (
            <TableCell align="center" key={key.toString()}>
              {key === "Total" ? key : "$" + key.toLocaleString("es-AR")}
            </TableCell>
          ))}
        </TableRow>
        <TableRow key={"row2"}>
          {Object.values(data.pay).map((key: any) => (
            <TableCell align="center" key={key.toString()}>
              {key === "Pagado" ? key : "$" + key.toLocaleString("es-AR")}
            </TableCell>
          ))}
        </TableRow>
        <TableRow key={"row3"}>
          {Object.entries(data.total).map(([key, value]: any) => (
            <TableCell align="center" key={key.toString()}>
              {key === "-"
                ? "% del Total"
                : ((value / data.total.total) * 100).toFixed(2) + "%"}
            </TableCell>
          ))}
        </TableRow>
      </TableBody>
    </Table>
  );
}
