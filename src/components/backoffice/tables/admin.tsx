"use client";
import BOFilters from "@/components/backoffice/filters";
import TableComponent from "@/components/backoffice/table";
import AdminForm from "@/components/forms/admin";
import { useAllAdmin } from "@/hooks/backoffice/admin";
import { UserBO } from "@/types/models";
import { useDisclosure } from "@nextui-org/modal";
import { useState } from "react";
import { useCookies } from "react-cookie";

export default function TableAdmin() {
  const [rowSelected, setRowSelected] = useState<UserBO | null>(null);
  const [cookies, setCookie] = useCookies(["user"]);
  const { rows, count, setQueries, queries, mutate } = useAllAdmin();

  const { isOpen, onClose, onOpen } = useDisclosure();

  const columns = [
    { key: "fullName", label: "Nombre" },
    { key: "email", label: "Email" },
    { key: "role", label: "Rol" },
    { key: "CompanyName", label: "Compañia" },
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
              filters={["role"]}
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
        <AdminForm
          isOpen={isOpen}
          onClose={onClose}
          mutate={mutate}
          setRowSelected={setRowSelected}
          rowSelected={rowSelected}></AdminForm>
      )}
    </div>
  );
}
