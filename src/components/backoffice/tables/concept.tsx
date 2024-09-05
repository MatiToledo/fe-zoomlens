"use client";
import BOFilters from "@/components/backoffice/filters";
import TableComponent from "@/components/backoffice/table";
import ConceptForm from "@/components/forms/concept";
import { useAllConcept } from "@/hooks/backoffice/concept";
import { Concept } from "@/types/models";
import { useDisclosure } from "@nextui-org/modal";
import { useState } from "react";
import { useCookies } from "react-cookie";

export default function TableConcept() {
  const [rowSelected, setRowSelected] = useState<Concept | null>(null);
  const [cookies, setCookie] = useCookies(["user"]);
  const { rows, count, setQueries, queries, mutate } = useAllConcept();

  const { isOpen, onClose, onOpen } = useDisclosure();

  const columns = [
    { key: "name", label: "Nombre" },
    { key: "type", label: "Tipo" },
    { key: "visible", label: "Visible" },
    { key: "level", label: "Nivel" },
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
              filters={["level"]}
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
        <ConceptForm
          isOpen={isOpen}
          onClose={onClose}
          mutate={mutate}
          setRowSelected={setRowSelected}
          rowSelected={rowSelected}></ConceptForm>
      )}
    </div>
  );
}
