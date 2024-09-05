"use client";
import BOFilters from "@/components/backoffice/filters";
import TableComponent from "@/components/backoffice/table";
import RegisterBarClosureBOForm from "@/components/forms/register/bar/closure/backoffice";
import { useAllRegisterBarClosure } from "@/hooks/backoffice/register/bar/closure";
import { RegisterBarClosure } from "@/types/models";
import getInitialsDate from "@/utils/getInitialsDate";
import { parseDate } from "@internationalized/date";
import { useDisclosure } from "@nextui-org/modal";
import { useState } from "react";
import { useCookies } from "react-cookie";

export default function TableRegisterBarClosure() {
  const [rowSelected, setRowSelected] = useState<RegisterBarClosure | null>(
    null
  );
  const [cookies, setCookie] = useCookies(["user"]);
  const [date, setDate] = useState({
    start: parseDate(getInitialsDate("start")),
    end: parseDate(getInitialsDate("end")),
  });
  const { rows, count, setQueries, queries, mutate } =
    useAllRegisterBarClosure(date);

  const { isOpen, onClose, onOpen } = useDisclosure();

  const columns = [
    { key: "date", label: "Fecha" },
    { key: "retirementTotal", label: "Total Retiro" },
    { key: "expensesTotal", label: "Total Gastos" },
    { key: "expensesObservations", label: "Observaciones gastos" },
    { key: "postnetTotal", label: "Total Postnet" },
    { key: "transfersTotal", label: "Total Transferencias" },
    { key: "cashTotalSystem", label: "Total Efectivo sistema" },
    { key: "transfersTotalSystem", label: "Total Postnet/Transf sistema" },
    { key: "consumptions", label: "Consumiciones" },
    { key: "observations", label: "Observaciones" },
    { key: "photo", label: "Foto" },
    { key: "RegisterBarName", label: "Barra" },
  ];

  return (
    <div className="grow flex flex-col p-5 bg-default-300 max-h-[calc(100vh-65px)] overflow-auto">
      {rows && (
        <TableComponent
          topContent={
            <BOFilters
              rows={rows}
              date={date}
              onOpen={onOpen}
              count={count}
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
        <RegisterBarClosureBOForm
          isOpen={isOpen}
          onClose={onClose}
          mutate={mutate}
          setRowSelected={setRowSelected}
          rowSelected={rowSelected}></RegisterBarClosureBOForm>
      )}
    </div>
  );
}
