"use client";
import { useCookies } from "react-cookie";
import FixedCostContent from "./content";

export default function TreasuryCentralFixedCostsCalculationComponent() {
  const [cookies, setCookie] = useCookies(["user"]);
  const user = cookies.user;
  return (
    <div className="max-h-[calc(100vh-65px)] w-full flex flex-col overflow-auto">
      <FixedCostContent user={user}></FixedCostContent>
    </div>
  );
}
