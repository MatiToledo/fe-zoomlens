"use client";
import { useGetMe } from "@/hooks/user";
import { BackIcon } from "@/ui/icons/back";
import Header from "../header";
import RegisterBarClosureForm from "../forms/register/bar/closure";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";

export default function RegisterBarClosureComponent() {
  const [cookies, setCookie] = useCookies(["user"]);
  const user = cookies.user;
  const { push } = useRouter();

  return (
    <div className="flex w-full flex-col items-center justify-center text-center pt-5 max-h-[calc(100vh-90px)]">
      <div className="relative flex flex-col grow overflow-auto w-full justify-start items-center pt-8 pb-8 text-center bg-default-300">
        <div className="relative max-w-[350px] min-w-[350px]">
          <h1 className="text-4xl font-bold tracking-tight ">Cierre de caja</h1>
          {user.role === "register" && (
            <div
              className="absolute top-[13px]"
              onClick={() => push("/")}
              style={{ backgroundColor: "transparent" }}
              aria-label="delete">
              <BackIcon className="cursor-pointer" fontSize="inherit" />
            </div>
          )}
        </div>
        <RegisterBarClosureForm
          BranchId={user.BranchId}></RegisterBarClosureForm>
      </div>
    </div>
  );
}
