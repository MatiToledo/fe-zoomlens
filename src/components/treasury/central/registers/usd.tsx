"use client";
import { useCookies } from "react-cookie";
import TableTreasuryCentralRegisterUSD from "./tables/usd";

export default function TreasuryCentralRegisterUSDComponent() {
  const [cookies, setCookie] = useCookies(["user"]);
  const user = cookies.user;
  return (
    <div className="h-[calc(100vh-65px)] w-full flex flex-col">
      <TableTreasuryCentralRegisterUSD user={user} title="Caja de Dolares" />
    </div>
  );
}
