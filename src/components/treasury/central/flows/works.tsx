"use client";
import { useCookies } from "react-cookie";
import TableFlowWorks from "./tables/works";

export default function FlowWorksComponent() {
  const [cookies, setCookie] = useCookies(["user"]);
  const user = cookies.user;
  return (
    <div className="h-[calc(100vh-65px)] w-full flex flex-col">
      <TableFlowWorks user={user} title="Flujo de Obras" />
    </div>
  );
}
