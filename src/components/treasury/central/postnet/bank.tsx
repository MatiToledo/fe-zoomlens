"use client";

import { useCookies } from "react-cookie";
import TableTreasuryCentralPostnetBank from "./tables/bank";

export default function TreasuryCentralPostnetBankComponent() {
  const [cookies, setCookie] = useCookies(["user"]);
  return (
    <div className="h-[calc(100vh-65px)] w-full flex flex-col">
      <TableTreasuryCentralPostnetBank
        user={cookies.user}
        title="Postnet de Banco"
      />
    </div>
  );
}
