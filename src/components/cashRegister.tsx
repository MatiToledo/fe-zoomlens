"use client";
import { BackIcon } from "@/ui/icons/back";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import CashRegisterForm from "./forms/cashRegister";
import useGetTreasuryNightResume from "@/hooks/treasury/night";

export default function CashRegisterComponent() {
  const [cookies, setCookie] = useCookies(["user"]);
  const { push } = useRouter();

  return (
    <div className="flex w-full flex-col items-center justify-center text-center pt-5">
      <div className="relative flex flex-col grow overflow-auto w-full justify-start items-center pt-8 pb-8 text-center bg-default-300">
        <div className="relative max-w-[350px] min-w-[350px]">
          <h1 className="text-4xl font-bold tracking-tight ">Cierre de caja</h1>
          <div
            className="absolute top-[13px]"
            onClick={() => push("/")}
            style={{ backgroundColor: "transparent" }}
            aria-label="delete">
            <BackIcon className="cursor-pointer" fontSize="inherit" />
          </div>
        </div>
        <CashRegisterForm
          CompanyName={cookies.user.CompanyName}
          BranchName={cookies.user.BranchName}
          BranchId={cookies.user.BranchId}></CashRegisterForm>
      </div>
    </div>
  );
}
