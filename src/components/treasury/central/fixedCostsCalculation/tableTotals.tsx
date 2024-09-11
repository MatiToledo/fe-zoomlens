import { FIXED_COST_TYPE_DICTIONARY } from "@/types/dictionaries";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function TableTotal({ data }: any) {
  const [table, setTable] = useState<any>();
  useEffect(() => {
    setTable(data);
  }, [data]);
  return (
    <>
      {table && (
        <Table
          aria-label="Totals table"
          classNames={{
            base: " min-w-[290px]",
            wrapper: `items-center min-h-[141px]`,
          }}>
          <TableHeader>
            {Object.keys(data.total).map((key: any) => (
              <TableColumn align="center" key={key}>
                {key !== "" ? FIXED_COST_TYPE_DICTIONARY[key] : key}
              </TableColumn>
            ))}
          </TableHeader>
          <TableBody>
            <TableRow key={"row1"}>
              {Object.values(data.total).map((key: any) => (
                <TableCell align="center" key={key.toString()}>
                  {key}
                </TableCell>
              ))}
            </TableRow>
            <TableRow key={"row2"}>
              <TableCell align="center" key={"title paid"}>
                {table.pay[""]}
              </TableCell>
              <TableCell align="center" key={"property paid"}>
                {table.pay.property}
              </TableCell>
              <TableCell align="center" key={"service paid"}>
                {table.pay.service}
              </TableCell>
              <TableCell align="center" key={"tax paid"}>
                {table.pay.tax}
              </TableCell>
              <TableCell align="center" key={"salary paid"}>
                {table.pay.salary}
              </TableCell>
              <TableCell align="center" key={"other paid"}>
                {table.pay.other}
              </TableCell>
              <TableCell align="center" key={"total paid"}>
                {table.pay.total}
              </TableCell>
            </TableRow>
            <TableRow key={"row2"}>
              {Object.values(data.percentage).map((key: any) => (
                <TableCell align="center" key={key.toString()}>
                  {key}
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      )}
    </>
  );
}
