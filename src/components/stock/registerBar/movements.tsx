"use client";
import { fetchBulkUpdateStockRegisterBar } from "@/api/endpoints/stock/registerBar";
import GridComponent from "@/components/treasury/central/grid";
import { useGetRegisterBarsByBranchId } from "@/hooks/register/bar";
import { useAllStockRegisterBarByRegisterId } from "@/hooks/stock/registerBar";
import { BackIcon } from "@/ui/icons/back";
import ControlledDatePicker from "@/ui/inputs/datePicker";
import { formattedToday } from "@/utils/formatedToday";
import { parseDate } from "@internationalized/date";
import {
  Button,
  getKeyValue,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { UUID } from "crypto";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { floatColumn, keyColumn, textColumn } from "react-datasheet-grid";
import StockRegisterBarCloseComponent from "./close";
import { FolderIcon } from "@/ui/icons/folder";

export default function StockRegisterBarMovementsComponent() {
  const [cookies, setCookie] = useCookies(["user"]);
  const user = cookies.user;
  const { push } = useRouter();
  const [registerBar, setRegisterBar] = useState<UUID | null>(null);
  const [date, setDate] = useState(parseDate(formattedToday));
  const registerBarOptions = useGetRegisterBarsByBranchId(user.BranchId);
  const { stockRegisterBar, setStockRegisterBar, mutate } =
    useAllStockRegisterBarByRegisterId(registerBar, date);
  const columns = [
    { ...keyColumn("ProductName", textColumn), title: "Nombre" },
    { ...keyColumn("initial", floatColumn), title: "Inicial", disabled: true },
    { ...keyColumn("entries", floatColumn), title: "Entradas" },
    { ...keyColumn("exits", floatColumn), title: "Salidas" },
  ];

  const isClosed = stockRegisterBar.some(
    (item) => item.StockRegisterBarClosureId
  );

  return (
    <div className="bg-default-300 grow overflow-x-hidden w-full p-5 text-center relative">
      <div className="flex justify-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4 max-w-[250px] md:max-w-[500px]">
          Movimientos de Stock
        </h1>
      </div>
      <div className="flex justify-center items-center mb-4 gap-5 flex-col md:flex-row">
        <div className="w-full flex flex-col items-center md:flex-row gap-5">
          <ControlledDatePicker
            date={date}
            setDate={setDate}></ControlledDatePicker>
          {registerBarOptions && (
            <Select
              className="max-w-md"
              key={`select registerBar`}
              aria-label={`Select registerBar`}
              label={"Barra"}
              value={registerBar as UUID}
              onChange={(e) => setRegisterBar(e.target.value as UUID)}
              fullWidth
              size="md">
              {registerBarOptions.map((option: any) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </Select>
          )}
        </div>
        {registerBar && !isClosed && (
          <Button
            isIconOnly
            onClick={() =>
              push(
                `/stockRegisterBar/closure?RegisterBarId=${registerBar}&date=${date}`
              )
            }
            className="bg-foreground text-background"
            endContent={<FolderIcon size={17} />}></Button>
        )}
      </div>
      <div
        className="absolute top-[24px]"
        onClick={() => push("/stockRegisterBar")}
        style={{ backgroundColor: "transparent" }}
        aria-label="delete">
        <BackIcon className="cursor-pointer" fontSize="inherit" />
      </div>

      {stockRegisterBar.length > 0 && !isClosed && registerBar && (
        <GridComponent
          data={stockRegisterBar}
          setData={setStockRegisterBar}
          columns={columns}
          mutate={mutate}
          BranchId={user.BranchId}
          fetcher={fetchBulkUpdateStockRegisterBar}
          showNew={false}
        />
      )}

      {stockRegisterBar.length === 0 && registerBar && (
        <p className="text-2xl mt-6 max-w-[300px] text-center  ml-auto mr-auto">
          Por favor, cargue el stock inicial para poder realizar los movimientos
          necesarios.
        </p>
      )}

      {stockRegisterBar && registerBar && isClosed && (
        <Table
          aria-label="Initial Stock"
          classNames={{
            wrapper: "flex justify-start",
            tr: "text-center",
            td: "text-center",
            th: "text-center",
          }}>
          <TableHeader
            columns={[
              { key: "ProductName", label: "Producto" },
              { key: "initial", label: "Inicial" },
              { key: "entries", label: "Entradas" },
              { key: "exits", label: "Salidas" },
              { key: "final", label: "Final" },
            ]}>
            {(column: any) => {
              return <TableColumn key={column.key}>{column.label}</TableColumn>;
            }}
          </TableHeader>
          <TableBody>
            {stockRegisterBar.map((row: any) => (
              <TableRow key={row.id}>
                {(columnKey) => (
                  <TableCell>{getKeyValue(row, columnKey)}</TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {!registerBar && (
        <div className="flex justify-center text-center">
          <h2 className="text-2xl font-bold tracking-tight mt-4">
            Seleccione una barra
          </h2>
        </div>
      )}
    </div>
  );
}
