"use client";
import { useCookies } from "react-cookie";
import TableTreasuryCentralRegisterMP from "./tables/mp";

export default function TreasuryCentralRegisterMPComponent() {
  const [cookies, setCookie] = useCookies(["user"]);
  const user = cookies.user;
  return (
    <div className="h-[calc(100vh-65px)] w-full flex flex-col">
      <TableTreasuryCentralRegisterMP
        user={user}
        title="Caja de Mercado Pago"
      />
    </div>
  );
}
