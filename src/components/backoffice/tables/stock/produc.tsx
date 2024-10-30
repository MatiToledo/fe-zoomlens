"use client";
import BOFilters from "@/components/backoffice/filters";
import TableComponent from "@/components/backoffice/table";
import StockProductForm from "@/components/forms/stock/product";
import { useAllProduct } from "@/hooks/backoffice/stock/product";
import { Product } from "@/types/models";
import { useDisclosure } from "@nextui-org/modal";
import { useState } from "react";
import { useCookies } from "react-cookie";

export default function TableStockProducts() {
  const [rowSelected, setRowSelected] = useState<Product | null>(null);
  const [cookies, setCookie] = useCookies(["user"]);

  const { rows, count, setQueries, queries, mutate } = useAllProduct();

  const { isOpen, onClose, onOpen } = useDisclosure();

  const columns = [
    { key: "name", label: "Nombre" },
    { key: "price", label: "Precio" },
    { key: "observation", label: "Observacion" },
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
              filters={["companies", "groups", "branches"]}
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
        <StockProductForm
          isOpen={isOpen}
          onClose={onClose}
          mutate={mutate}
          setRowSelected={setRowSelected}
          rowSelected={rowSelected}></StockProductForm>
      )}
    </div>
  );
}
