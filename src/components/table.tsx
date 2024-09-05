import { TREASURY_TABLES_DICTIONARY } from "@/types/dictionaries";
import { processTableMovementsValue } from "@/utils/processTableValue";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from "@nextui-org/react";

export default function TableComponent({ data, table, isLoading }: any) {
  const span =
    table === "principal" || table === "expensesDetails" ? "col-span-2" : "";

  return (
    <Table
      topContent={
        <h2 className="w-full  text-lg lg:text-xl text-default-600 block text-center">
          {TREASURY_TABLES_DICTIONARY[table]}
        </h2>
      }
      topContentPlacement="outside"
      aria-label="Example table with dynamic content"
      classNames={{
        base: `${span}`,
        wrapper: "flex justify-start",
        tr: "text-center",
        td: "text-center",
        th: "text-center",
      }}>
      <TableHeader columns={data.columns}>
        {(column: any) => {
          return <TableColumn key={column.key}>{column.label}</TableColumn>;
        }}
      </TableHeader>
      <TableBody isLoading={isLoading} emptyContent="No hay movimientos">
        {data.rows.map((row: any) => (
          <TableRow
            key={row.id}
            className={
              row[""] === "Suma Retiros" ||
              (row[""] === "Total efectivo" && table !== "resumen") ||
              row[""] === "Total" ||
              row[""] === "Facturación total"
                ? "border-t-solid border-t-1"
                : ""
            }>
            {(columnKey) => (
              <TableCell className={columnKey === "" ? "px-0 py-0" : ""}>
                {processTableMovementsValue(
                  columnKey,
                  getKeyValue(row, columnKey),
                  row
                )}
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
