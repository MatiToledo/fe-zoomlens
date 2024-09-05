"use client";
import TreasuryNightExpenseForm from "@/components/forms/treasury/night/expense";
import { BackIcon } from "@/ui/icons/back";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";

export default function TreasuryNightExpenseComponent() {
  const [cookies, setCookie] = useCookies(["user"]);
  const { push } = useRouter();

  return (
    <div className="flex w-full flex-col items-center justify-center text-center pt-5">
      <div className="relative max-w-[350px] min-w-[350px]">
        <h1 className="text-4xl font-bold tracking-tight ">
          Gasto de tesoreria
        </h1>
        <div
          className="absolute top-[13px]"
          onClick={() => push("/treasuryNight")}
          style={{ backgroundColor: "transparent" }}
          aria-label="delete">
          <BackIcon className="cursor-pointer" fontSize="inherit" />
        </div>
      </div>
      <TreasuryNightExpenseForm BranchId={cookies.user.BranchId} />
    </div>
  );
}
