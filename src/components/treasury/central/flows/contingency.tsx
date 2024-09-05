"use client";
import { useCookies } from "react-cookie";
import TableFlowContingency from "./tables/contingency";

export default function FlowContingencyComponent() {
  const [cookies, setCookie] = useCookies(["user"]);
  const user = cookies.user;
  return (
    <div className="h-[calc(100vh-65px)] w-full flex flex-col">
      <TableFlowContingency user={user} title="Flujo de Contingencias" />
    </div>
  );
}
