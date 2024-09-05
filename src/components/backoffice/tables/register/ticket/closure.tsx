"use client";
import BOFilters from "@/components/backoffice/filters";
import TableComponent from "@/components/backoffice/table";
import RegisterTicketClosureBOForm from "@/components/forms/register/ticket/closure/backoffice";
import { useAllRegisterTicketClosure } from "@/hooks/backoffice/register/ticket/closure";
import { RegisterTicketClosure } from "@/types/models";
import getInitialsDate from "@/utils/getInitialsDate";
import { parseDate } from "@internationalized/date";
import { useDisclosure } from "@nextui-org/modal";
import { useState } from "react";
import { useCookies } from "react-cookie";

export default function TableRegisterTicketClosure() {
  const [rowSelected, setRowSelected] = useState<RegisterTicketClosure | null>(
    null
  );
  const [cookies, setCookie] = useCookies(["user"]);
  const [date, setDate] = useState({
    start: parseDate(getInitialsDate("start")),
    end: parseDate(getInitialsDate("end")),
  });
  const { rows, count, setQueries, queries, mutate } =
    useAllRegisterTicketClosure(date);

  const { isOpen, onClose, onOpen } = useDisclosure();

  const columns = [
    { key: "date", label: "Fecha" },
    { key: "retirementTotal", label: "Total Retiro" },
    { key: "expensesTotal", label: "Total Gastos" },
    { key: "expensesObservations", label: "Observaciones gastos" },
    { key: "postnetTotal", label: "Total Postnet" },
    { key: "transfersTotal", label: "Total Transferencias" },
    { key: "soldTotal", label: "Total vendido" },
    { key: "observations", label: "Observaciones" },
    { key: "totalEarnedAccount", label: "Cuenta ganado total" },
    { key: "earnedAccountBar", label: "Cuenta ganado cierre bar" },
    { key: "tickets", label: "Tickets" },
    { key: "photo", label: "Foto" },
    { key: "RegisterTicketName", label: "Boleteria" },
  ];

  return (
    <div className="grow flex flex-col p-5 bg-default-300 max-h-[calc(100vh-65px)] overflow-auto">
      {rows && (
        <TableComponent
          topContent={
            <BOFilters
              rows={rows}
              onOpen={onOpen}
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
      {rowSelected && (
        <RegisterTicketClosureBOForm
          isOpen={isOpen}
          onClose={onClose}
          mutate={mutate}
          setRowSelected={setRowSelected}
          rowSelected={rowSelected}></RegisterTicketClosureBOForm>
      )}
    </div>
  );
}
