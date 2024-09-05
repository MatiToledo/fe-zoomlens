"use client";
import BOFilters from "@/components/backoffice/filters";
import TableComponent from "@/components/backoffice/table";
import BORegisterBarForm from "@/components/forms/register/bar";
import UserForm from "@/components/forms/user";
import { useAllUser } from "@/hooks/backoffice/user";
import { User } from "@/types/models";
import { useDisclosure } from "@nextui-org/modal";
import { useState } from "react";
import { useCookies } from "react-cookie";

export default function TableUser() {
  const [rowSelected, setRowSelected] = useState<User | null>(null);
  const [cookies, setCookie] = useCookies(["user"]);
  const { rows, count, setQueries, queries, mutate } = useAllUser();

  const { isOpen, onClose, onOpen } = useDisclosure();

  const columns = [
    { key: "photo", label: "Foto" },
    { key: "fullName", label: "Nombre" },
    { key: "phone", label: "Telefono" },
    { key: "email", label: "Email" },
    { key: "dni", label: "DNI" },
    { key: "role", label: "Cargo" },
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
        <UserForm
          isOpen={isOpen}
          onClose={onClose}
          mutate={mutate}
          setRowSelected={setRowSelected}
          rowSelected={rowSelected}></UserForm>
      )}
    </div>
  );
}
