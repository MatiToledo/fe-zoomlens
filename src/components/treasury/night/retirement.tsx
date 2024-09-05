"use client";
import TreasuryNightRetirementForm from "@/components/forms/treasury/night/retirement";
import { BackIcon } from "@/ui/icons/back";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";

export default function TreasuryRetirementComponent() {
  const { push } = useRouter();
  const [cookies, setCookie] = useCookies(["user"]);
  return (
    <div className="flex w-full flex-col items-center justify-center text-center pt-5">
      <div className="relative flex flex-col grow overflow-auto w-full justify-start items-center pt-8 pb-8 text-center bg-default-300">
        <div className="relative max-w-[350px] min-w-[350px]">
          <h1 className="text-4xl font-bold tracking-tight ">Retiro de caja</h1>
          <div
            className="absolute top-[13px]"
            onClick={() => push("/treasuryNight")}
            style={{ backgroundColor: "transparent" }}
            aria-label="delete">
            <BackIcon className="cursor-pointer" fontSize="inherit" />
          </div>
        </div>
        <TreasuryNightRetirementForm BranchId={cookies.user.BranchId} />
      </div>
    </div>
  );
}
