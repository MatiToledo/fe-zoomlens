"use client";
import { useCookies } from "react-cookie";
import TableTreasuryCentralRegisterBank from "./tables/bank";

export default function TreasuryCentralRegisterBankComponent() {
  const [cookies, setCookie] = useCookies(["user"]);
  const user = cookies.user;
  return (
    <div className="h-[calc(100vh-65px)] w-full flex flex-col">
      <TableTreasuryCentralRegisterBank user={user} title="Caja de Banco" />
    </div>
  );
}
