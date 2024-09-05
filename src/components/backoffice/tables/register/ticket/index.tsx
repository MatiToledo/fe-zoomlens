"use client";
import BOFilters from "@/components/backoffice/filters";
import TableComponent from "@/components/backoffice/table";
import BORegisterTicketForm from "@/components/forms/register/ticket";
import { useAllRegisterTicket } from "@/hooks/backoffice/register/ticket";
import { useDisclosure } from "@nextui-org/modal";
import { useState } from "react";
import { useCookies } from "react-cookie";

export default function TableRegisterTicket() {
  const [rowSelected, setRowSelected] = useState(null);
  const [cookies, setCookie] = useCookies(["user"]);

  const { rows, count, setQueries, queries, mutate } = useAllRegisterTicket();

  const { isOpen, onClose, onOpen } = useDisclosure();

  const columns = [
    { key: "name", label: "Nombre" },
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
        <BORegisterTicketForm
          isOpen={isOpen}
          onClose={onClose}
          mutate={mutate}
          setRowSelected={setRowSelected}
          rowSelected={rowSelected}></BORegisterTicketForm>
      )}
    </div>
  );
}
