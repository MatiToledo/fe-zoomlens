"use client";
import BOFilters from "@/components/backoffice/filters";
import TableComponent from "@/components/backoffice/table";
import TreasuryCentralPostnetForm from "@/components/forms/treasury/central/postnet";
import { useAllPostnetBank } from "@/hooks/backoffice/treasury/central/postnet/bank";
import { PostnetBank } from "@/types/models";
import getInitialsDate from "@/utils/getInitialsDate";
import { parseDate } from "@internationalized/date";
import { useDisclosure } from "@nextui-org/modal";
import { UUID } from "crypto";
import { useState } from "react";
import { useCookies } from "react-cookie";

export default function TableTreasuryCentralPostnetBank() {
  const [rowSelected, setRowSelected] = useState<PostnetBank | null>(null);
  const [cookies, setCookie] = useCookies(["user"]);
  const [date, setDate] = useState({
    start: parseDate(getInitialsDate("start")),
    end: parseDate(getInitialsDate("end")),
  });
  const { rows, count, setQueries, queries, mutate } = useAllPostnetBank(date);

  const { isOpen, onClose, onOpen } = useDisclosure();

  const columns = [
    { key: "date", label: "Fecha" },
    { key: "comment", label: "Comentario" },
    { key: "debit", label: "Debito" },
    { key: "credit", label: "Credito" },
    { key: "qr", label: "QR" },
    { key: "total", label: "Total" },
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
        <TreasuryCentralPostnetForm
          BranchId={rowSelected?.BranchId as UUID}
          isOpen={isOpen}
          onClose={onClose}
          mutate={mutate}
          setRowSelected={setRowSelected}
          rowSelected={rowSelected}></TreasuryCentralPostnetForm>
      )}
    </div>
  );
}
