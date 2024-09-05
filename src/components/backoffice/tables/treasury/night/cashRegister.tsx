"use client";
import BOFilters from "@/components/backoffice/filters";
import TableComponent from "@/components/backoffice/table";
import CashRegisterBOForm from "@/components/forms/cashRegister/backoffice";
import { useAllCashRegister } from "@/hooks/backoffice/treasury/night/cashRegister";
import { CashRegister } from "@/types/models";
import getInitialsDate from "@/utils/getInitialsDate";
import { parseDate } from "@internationalized/date";
import { useDisclosure } from "@nextui-org/modal";
import { useState } from "react";
import { useCookies } from "react-cookie";

export default function TableCashRegister() {
  const [rowSelected, setRowSelected] = useState<CashRegister | null>(null);
  const [cookies, setCookie] = useCookies(["user"]);
  const [date, setDate] = useState({
    start: parseDate(getInitialsDate("start")),
    end: parseDate(getInitialsDate("end")),
  });
  const { rows, count, setQueries, queries, mutate } = useAllCashRegister(date);

  const { isOpen, onClose, onOpen } = useDisclosure();

  const columns = [
    { key: "date", label: "Fecha" },
    { key: "CompanyName", label: "Compañia" },
    { key: "BranchName", label: "Sucursal" },
    { key: "comment", label: "Comentarios" },
    { key: "amountActual", label: "Monto" },
    { key: "amountTheoretical", label: "Monto Teórico" },
    { key: "retirementsTotal", label: "Retiros" },
    { key: "retirementsFinishTotal", label: "Retiros Finales" },
    {
      key: "retirementsFinishExpensesTotal",
      label: "Gastos Retiros Finales",
    },
    { key: "treasuryExpensesTotal", label: "Gastos Tesoreria" },
    { key: "expensesTotal", label: "Gastos" },
    { key: "postnetTotal", label: "Postnet Total" },
    { key: "transfersTotal", label: "Transferencias Total" },
    { key: "cashTotal", label: "Efectivo Total" },
    { key: "earnedAccount", label: "Cuenta ganado" },
    { key: "difference", label: "Diferencia" },
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
        <CashRegisterBOForm
          isOpen={isOpen}
          onClose={onClose}
          mutate={mutate}
          setRowSelected={setRowSelected}
          rowSelected={rowSelected}></CashRegisterBOForm>
      )}
    </div>
  );
}
