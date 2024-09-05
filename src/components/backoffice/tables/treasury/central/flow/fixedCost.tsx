"use client";
import BOFilters from "@/components/backoffice/filters";
import TableComponent from "@/components/backoffice/table";
import TreasuryCentralForm from "@/components/forms/treasury/central";
import { useAllFlowFixedCost } from "@/hooks/backoffice/treasury/central/flow/fixedFlow";
import { FlowFixedCost } from "@/types/models";
import getInitialsDate from "@/utils/getInitialsDate";
import { parseDate } from "@internationalized/date";
import { useDisclosure } from "@nextui-org/modal";
import { UUID } from "crypto";
import { useState } from "react";
import { useCookies } from "react-cookie";

export default function TableTreasuryCentralFlowFixedCost() {
  const [rowSelected, setRowSelected] = useState<FlowFixedCost | null>(null);
  const [cookies, setCookie] = useCookies(["user"]);
  const [date, setDate] = useState({
    start: parseDate(getInitialsDate("start")),
    end: parseDate(getInitialsDate("end")),
  });
  const { rows, count, setQueries, queries, mutate } =
    useAllFlowFixedCost(date);

  const { isOpen, onClose, onOpen } = useDisclosure();

  const columns = [
    { key: "date", label: "Fecha" },
    { key: "ConceptName", label: "Concepto" },
    { key: "description", label: "Descripcion" },
    { key: "type", label: "Tipo" },
    { key: "amount", label: "Monto" },
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
      {isOpen && (
        <TreasuryCentralForm
          BranchId={rowSelected?.BranchId as UUID}
          isOpen={isOpen}
          onClose={onClose}
          mutate={mutate}
          setRowSelected={setRowSelected}
          rowSelected={rowSelected}></TreasuryCentralForm>
      )}
    </div>
  );
}
