"use client";
import Header from "@/components/header";
import { useCookies } from "react-cookie";
import TablesTreasuryNight from "./tables";

export default function TreasuryNightResumeComponent() {
  const [cookies, setCookie] = useCookies(["user"]);
  return (
    <div className="grow flex flex-col p-5 bg-default-300">
      <TablesTreasuryNight user={cookies.user} />
    </div>
  );
}
