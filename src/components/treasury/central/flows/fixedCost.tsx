"use client";
import { useCookies } from "react-cookie";
import TableFlowFixedCost from "./tables/fixedCost";

export default function FlowFixedCostComponent() {
  const [cookies, setCookie] = useCookies(["user"]);
  const user = cookies.user;
  return (
    <div className="h-[calc(100vh-65px)] w-full flex flex-col">
      <TableFlowFixedCost user={user} title="Flujo de Costos Fijos" />
    </div>
  );
}
