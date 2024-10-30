"use client";
import StockCentralForm from "@/components/forms/stock/central";
import { BackIcon } from "@/ui/icons/back";
import { useRouter, useSearchParams } from "next/navigation";
import { useCookies } from "react-cookie";

export default function StockCentralUpdateComponent() {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const [cookies, setCookie] = useCookies(["user"]);
  const user = cookies.user;
  const type = searchParams.get("type");
  const isEntry = type === "entry";

  return (
    <div className="bg-default-300 grow overflow-x-hidden w-full p-5 text-center relative">
      <div className="relative flex flex-col grow overflow-auto w-full justify-start items-center pt-8 pb-8 text-center bg-default-300">
        <div className="relative max-w-[350px] min-w-[350px]">
          <h1 className="text-4xl font-bold tracking-tight ">
            {isEntry ? "Compra" : "Salida"} de Stock
          </h1>

          <div
            className="absolute top-[13px]"
            onClick={() => push("/")}
            style={{ backgroundColor: "transparent" }}
            aria-label="delete">
            <BackIcon className="cursor-pointer" fontSize="inherit" />
          </div>
        </div>
        <StockCentralForm BranchId={user.BranchId} type={type} />
      </div>
    </div>
  );
}
