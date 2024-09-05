"use client";

import { useCookies } from "react-cookie";
import TableTreasuryCentralPostnetMP from "./tables/mp";

export default function TreasuryCentralPostnetMPComponent() {
  const [cookies, setCookie] = useCookies(["user"]);
  return (
    <div className="h-[calc(100vh-65px)] w-full flex flex-col">
      <TableTreasuryCentralPostnetMP
        user={cookies.user}
        title="Postnet de Mercado Pago"
      />
    </div>
  );
}
