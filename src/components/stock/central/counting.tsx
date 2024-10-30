"use client";
import { fetchBulkCreateStockCentral } from "@/api/endpoints/stock/central";
import GridComponent from "@/components/treasury/central/grid";
import { useAllStockCentralByBranchIdIncludedProducts } from "@/hooks/stock/central";
import { BackIcon } from "@/ui/icons/back";
import ControlledWeek from "@/ui/inputs/week";
import { formattedToday } from "@/utils/formatedToday";
import { parseDate } from "@internationalized/date";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { floatColumn, keyColumn, textColumn } from "react-datasheet-grid";

export default function StockCentralProductsCountingComponent() {
  const [cookies, setCookie] = useCookies(["user"]);
  const { user } = cookies;
  const { push } = useRouter();
  const [date, setDate] = useState(parseDate(formattedToday));

  const { stockCentral, setStockCentral, mutate } =
    useAllStockCentralByBranchIdIncludedProducts(user.BranchId, date);

  const columns = [
    { ...keyColumn("ProductName", textColumn), title: "Nombre" },
    { ...keyColumn("initial", floatColumn), title: "Cantidad" },
    { ...keyColumn("entries", floatColumn), title: "Compras", disabled: true },
    { ...keyColumn("exits", floatColumn), title: "Salidas", disabled: true },
    { ...keyColumn("total", floatColumn), title: "Total", disabled: true },
  ];

  return (
    <div className="bg-default-300 grow overflow-x-hidden w-full p-5 text-center relative">
      <h1 className="text-4xl font-bold tracking-tight mb-4 ">
        Conteo de Stock
      </h1>
      <div className="flex grow-1 justify-center mb-4">
        <ControlledWeek date={date} setDate={setDate}></ControlledWeek>
      </div>
      <div
        className="absolute top-[32px]"
        onClick={() => push("/")}
        style={{ backgroundColor: "transparent" }}
        aria-label="delete">
        <BackIcon className="cursor-pointer" fontSize="inherit" />
      </div>
      {stockCentral && (
        <GridComponent
          data={stockCentral}
          setData={setStockCentral}
          columns={columns}
          mutate={mutate}
          BranchId={user.BranchId}
          fetcher={fetchBulkCreateStockCentral}
          showNew={false}
        />
      )}
    </div>
  );
}
