"use client";
import BOFilters from "@/components/backoffice/filters";
import TableComponent from "@/components/backoffice/table";
import StockCentralBOForm from "@/components/forms/stock/central/backoffice";
import StockProductForm from "@/components/forms/stock/product";
import { useAllStockCentral } from "@/hooks/backoffice/stock/central";
import { useAllProduct } from "@/hooks/backoffice/stock/product";
import { StockCentral } from "@/types/models";
import { useDisclosure } from "@nextui-org/modal";
import { UUID } from "crypto";
import { useState } from "react";
import { useCookies } from "react-cookie";

export default function TableStockCentrals() {
  const [rowSelected, setRowSelected] = useState<StockCentral | null>(null);
  const [cookies, setCookie] = useCookies(["user"]);

  const { rows, count, setQueries, queries, mutate } = useAllStockCentral();

  const { isOpen, onClose, onOpen } = useDisclosure();

  const columns = [
    { key: "ProductName", label: "Producto" },
    { key: "initial", label: "Inicial" },
    { key: "entries", label: "Compras" },
    { key: "exits", label: "Salidas" },
    { key: "total", label: "Total" },
    { key: "month", label: "Mes" },
    { key: "week", label: "Semana" },
    { key: "CompanyName", label: "Compañia" },
    { key: "GroupName", label: "Grupo" },
    { key: "BranchName", label: "Sucursal" },
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
              queries={queries}
              setQueries={setQueries}
              filters={[
                "companies",
                "groups",
                "branches",
                "year",
                "month",
                "week",
              ]}
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

      {isOpen && (
        <StockCentralBOForm
          BranchId={rowSelected?.BranchId as UUID}
          isOpen={isOpen}
          onClose={onClose}
          mutate={mutate}
          setRowSelected={setRowSelected}
          rowSelected={rowSelected}></StockCentralBOForm>
      )}
    </div>
  );
}
