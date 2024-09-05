"use client";
import BOFilters from "@/components/backoffice/filters";
import TableComponent from "@/components/backoffice/table";
import RetirementFinishBOForm from "@/components/forms/treasury/night/retirementFinish/backoffice";
import { useAllRetirementFinish } from "@/hooks/backoffice/treasury/night/retirementFinish";
import { RetirementFinish } from "@/types/models";
import getInitialsDate from "@/utils/getInitialsDate";
import { parseDate } from "@internationalized/date";
import { useDisclosure } from "@nextui-org/modal";
import { useState } from "react";
import { useCookies } from "react-cookie";

export default function TableTreasuryNightRetirementFinish() {
  const [rowSelected, setRowSelected] = useState<RetirementFinish | null>(null);
  const [cookies, setCookie] = useCookies(["user"]);
  const [date, setDate] = useState({
    start: parseDate(getInitialsDate("start")),
    end: parseDate(getInitialsDate("end")),
  });
  const { rows, count, setQueries, queries, mutate } =
    useAllRetirementFinish(date);

  const { isOpen, onClose, onOpen } = useDisclosure();

  const columns = [
    { key: "type", label: "Tipo" },
    { key: "date", label: "Fecha" },
    { key: "expenses", label: "Gastos" },
    { key: "postnetBank", label: "Postnet Banco" },
    { key: "postnetMP", label: "Postnet MP" },
    { key: "transfers", label: "Transferencias" },
    { key: "amount", label: "Monto" },
    { key: "RegisterName", label: "Caja" },
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
        <RetirementFinishBOForm
          isOpen={isOpen}
          onClose={onClose}
          mutate={mutate}
          setRowSelected={setRowSelected}
          rowSelected={rowSelected}></RetirementFinishBOForm>
      )}
    </div>
  );
}
