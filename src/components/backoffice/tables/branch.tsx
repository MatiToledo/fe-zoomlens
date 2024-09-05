"use client";
import BOFilters from "@/components/backoffice/filters";
import TableComponent from "@/components/backoffice/table";
import BranchForm from "@/components/forms/branch";
import { useAllBranch } from "@/hooks/backoffice/branch";
import { Branch } from "@/types/models";
import { useDisclosure } from "@nextui-org/modal";
import { useState } from "react";
import { useCookies } from "react-cookie";

export default function TableBranch() {
  const [rowSelected, setRowSelected] = useState<Branch | null>(null);
  const [cookies, setCookie] = useCookies(["user"]);
  const { rows, count, setQueries, queries, mutate } = useAllBranch();

  const { isOpen, onClose, onOpen } = useDisclosure();

  const columns = [
    { key: "name", label: "Nombre" },
    { key: "CompanyName", label: "Compañia" },
    { key: "GroupName", label: "Grupo" },
    { key: "barsCant", label: "Cantidad Barras" },
    { key: "ticketsCant", label: "Cantidad Boleteria" },
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
              filters={["companies", "groups"]}
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
        <BranchForm
          isOpen={isOpen}
          onClose={onClose}
          mutate={mutate}
          setRowSelected={setRowSelected}
          rowSelected={rowSelected}></BranchForm>
      )}
    </div>
  );
}
