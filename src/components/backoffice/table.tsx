import { subtitle } from "@/config/primitives";
import { usePathnameData } from "@/hooks/backoffice";
import { QueryTables } from "@/types";
import processTableValue from "@/utils/processTableValue";
import { Spinner } from "@nextui-org/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from "@nextui-org/table";
import { Dispatch, SetStateAction } from "react";
import { KeyedMutator } from "swr";
import PaginationComponent from "./pagination";

type TableComponentProps = {
  columns: any[];
  rows: any[];
  setQueries: Dispatch<SetStateAction<QueryTables>>;
  queries: QueryTables;
  mutate: KeyedMutator<any>;
  onOpen?: () => void;
  setRowSelected: Dispatch<SetStateAction<any | null>>;
  count: number;
  topContent: any;
  isAdmin: boolean;
};

export default function TableComponent({
  columns,
  rows,
  setQueries,
  queries,
  isAdmin,
  onOpen,
  topContent,
  setRowSelected,
  count,
}: TableComponentProps) {
  if (isAdmin && !columns.some((column) => column.key === "edit")) {
    columns.push({ key: "edit", label: "Editar" });
  }
  const { identifier } = usePathnameData();

  return (
    <Table
      isStriped
      isHeaderSticky
      classNames={{
        wrapper:
          "flex justify-start h-[calc(100vh-285px)] md:h-[calc(100vh-237px)] lg:h-[calc(100vh-309px)]",
        tr: "text-center text-wrap",
        td: "text-center text-wrap",
        th: "text-center text-wrap",
      }}
      topContentPlacement="outside"
      bottomContentPlacement="outside"
      topContent={topContent}
      bottomContent={
        <PaginationComponent
          page={queries.page}
          setQueries={setQueries}
          total={Math.ceil(
            count / parseInt(queries.limit) || 1
          )}></PaginationComponent>
      }>
      <TableHeader>
        {columns.map((column: any) => (
          <TableColumn key={column.key}>{column.label}</TableColumn>
        ))}
      </TableHeader>
      <TableBody
        loadingContent={<Spinner />}
        emptyContent={
          <div className="text-center flex w-full h-full justify-center items-center align-middle grow">
            <h2 className={subtitle({ class: "mt-4", color: "blue" })}>
              No hay datos
            </h2>
          </div>
        }>
        {rows.map((row: any) => {
          function onClick() {
            setRowSelected(rows[rows.indexOf(row)]);
          }
          return (
            <TableRow key={row.id}>
              {(columnKey) => (
                <TableCell>
                  {processTableValue(
                    columnKey,
                    row,
                    identifier,
                    getKeyValue(row, columnKey),
                    onOpen,
                    onClick
                  )}
                </TableCell>
              )}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
