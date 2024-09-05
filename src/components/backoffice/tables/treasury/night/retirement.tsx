"use client";
import BOFilters from "@/components/backoffice/filters";
import TableComponent from "@/components/backoffice/table";
import RetirementBOForm from "@/components/forms/treasury/night/retirement/backoffice";
import { useAllRetirement } from "@/hooks/backoffice/treasury/night/retirement";
import { Retirement } from "@/types/models";
import getInitialsDate from "@/utils/getInitialsDate";
import { parseDate } from "@internationalized/date";
import { useDisclosure } from "@nextui-org/modal";
import { useState } from "react";
import { useCookies } from "react-cookie";

export default function TableTreasuryNightRetirement() {
  const [rowSelected, setRowSelected] = useState<Retirement | null>(null);
  const [cookies, setCookie] = useCookies(["user"]);
  const [date, setDate] = useState({
    start: parseDate(getInitialsDate("start")),
    end: parseDate(getInitialsDate("end")),
  });
  const { rows, count, setQueries, queries, mutate } = useAllRetirement(date);

  const { isOpen, onClose, onOpen } = useDisclosure();

  const columns = [
    { key: "date", label: "Fecha" },
    { key: "type", label: "Tipo" },
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
        <RetirementBOForm
          isOpen={isOpen}
          onClose={onClose}
          mutate={mutate}
          setRowSelected={setRowSelected}
          rowSelected={rowSelected}></RetirementBOForm>
      )}
    </div>
  );
}
