"use client";
import BOFilters from "@/components/backoffice/filters";
import TableComponent from "@/components/backoffice/table";
import { useAllStockRegisterBar } from "@/hooks/backoffice/stock/registerBar";
import { StockRegisterBar } from "@/types/models";
import getInitialsDate from "@/utils/getInitialsDate";
import { parseDate } from "@internationalized/date";
import { useDisclosure } from "@nextui-org/modal";
import { useState } from "react";
import { useCookies } from "react-cookie";

export default function TableStockRegisterBars() {
  const [rowSelected, setRowSelected] = useState<StockRegisterBar | null>(null);
  const [cookies, setCookie] = useCookies(["user"]);
  const [date, setDate] = useState({
    start: parseDate(getInitialsDate("start")),
    end: parseDate(getInitialsDate("end")),
  });
  const { rows, count, setQueries, queries, mutate } =
    useAllStockRegisterBar(date);

  const { isOpen, onClose, onOpen } = useDisclosure();

  const columns = [
    { key: "date", label: "Fecha" },
    { key: "ProductName", label: "Producto" },
    { key: "initial", label: "Inicial" },
    { key: "entries", label: "Entradas" },
    { key: "exits", label: "Salidas" },
    { key: "consumed", label: "Consumido" },
    { key: "final", label: "Final" },
    { key: "closed", label: "Cerrada" },
    { key: "CompanyName", label: "Compañia" },
    { key: "GroupName", label: "Grupo" },
    { key: "BranchName", label: "Sucursal" },
    { key: "RegisterBarName", label: "Barra" },
  ];

  return (
    <div className="grow flex flex-col p-5 bg-default-300 max-h-[calc(100vh-65px)] overflow-auto">
      {rows && (
        <TableComponent
          topContent={
            <BOFilters
              onOpen={onOpen}
              rows={rows}
              count={count}
              date={date}
              setDate={setDate}
              queries={queries}
              setQueries={setQueries}
              filters={["dates", "companies", "groups", "branches"]}
              user={cookies.user}
            />
          }
          setRowSelected={setRowSelected}
          mutate={mutate}
          count={count}
          queries={queries}
          columns={columns}
          rows={rows}
          isAdmin={cookies.user.role === "admin"}
          setQueries={setQueries}
          onOpen={onOpen}></TableComponent>
      )}

      {/* {isOpen && (
        <StockProductForm
          isOpen={isOpen}
          onClose={onClose}
          mutate={mutate}
          setRowSelected={setRowSelected}
          rowSelected={rowSelected}></StockProductForm>
      )} */}
    </div>
  );
}