"use client";
import { useCookies } from "react-cookie";
import TableTreasuryCentralRegisterCash from "./tables/cash";

export default function TreasuryCentralRegisterCashComponent() {
  const [cookies, setCookie] = useCookies(["user"]);
  const user = cookies.user;
  return (
    <div className="h-[calc(100vh-65px)] w-full flex flex-col">
      <TableTreasuryCentralRegisterCash user={user} title="Caja de Efectivo" />
    </div>
  );
}
