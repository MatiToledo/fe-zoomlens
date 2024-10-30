"use client";
import { fetchBulkCreateStockRegisterBar } from "@/api/endpoints/stock/registerBar";
import GridComponent from "@/components/treasury/central/grid";
import { useGetRegisterBarsByBranchId } from "@/hooks/register/bar";
import { useAllStockRegisterBarByRegisterIdIncludedProducts } from "@/hooks/stock/registerBar";
import { BackIcon } from "@/ui/icons/back";
import ControlledDatePicker from "@/ui/inputs/datePicker";
import { formattedToday } from "@/utils/formatedToday";
import { parseDate } from "@internationalized/date";
import {
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

export default function StockRegisterBarInitialComponent() {
  const [cookies, setCookie] = useCookies(["user"]);
  const user = cookies.user;
  const { push } = useRouter();
  const [registerBar, setRegisterBar] = useState<UUID | null>(null);
  const [date, setDate] = useState(parseDate(formattedToday));
  const registerBarOptions = useGetRegisterBarsByBranchId(user.BranchId);
  const { stockRegisterBar, setStockRegisterBar, mutate } =
    useAllStockRegisterBarByRegisterIdIncludedProducts(registerBar, date);
  const canEdit = stockRegisterBar[0]?.canEdit ?? false;
  const columns = [
    { ...keyColumn("ProductName", textColumn), title: "Nombre" },
    {
      ...keyColumn("initial", floatColumn),
      title: "Cantidad",
    },
  ];
  return (
    <div className="bg-default-300 grow overflow-x-hidden w-full p-5 text-center relative">
      <div className="flex justify-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4 max-w-[250px] md:max-w-[500px]">
          Conteo Inicial de Stock
        </h1>
      </div>
      <div className="flex justify-center items-center mb-4 gap-5 flex-col md:flex-row">
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
      <div
        className="absolute top-[24px]"
        onClick={() => push("/stockRegisterBar")}
        style={{ backgroundColor: "transparent" }}
        aria-label="delete">
        <BackIcon className="cursor-pointer" fontSize="inherit" />
      </div>

      {stockRegisterBar && registerBar && canEdit && (
        <GridComponent
          data={stockRegisterBar}
          setData={setStockRegisterBar}
          columns={columns}
          mutate={mutate}
          BranchId={user.BranchId}
          fetcher={canEdit ? fetchBulkCreateStockRegisterBar : undefined}
          showNew={false}
        />
      )}
      {stockRegisterBar && registerBar && !canEdit && (
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
