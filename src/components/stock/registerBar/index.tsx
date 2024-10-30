"use client";
import { BackIcon } from "@/ui/icons/back";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";

export default function StockRegisterBarComponent() {
  const [cookies, setCookie] = useCookies(["user"]);
  const user = cookies.user;
  const { push } = useRouter();

  return (
    <div className="h-[calc(100vh-65px)] p-5 w-full  flex justify-center items-center relative">
      <div className="flex flex-col container mx-auto p-4 gap-4 max-w-md h-full grow justify-center ">
        {user.role === "register" && (
          <div
            className="absolute top-[24px] left-[24px]"
            onClick={() => push("/")}
            style={{ backgroundColor: "transparent" }}
            aria-label="delete">
            <BackIcon className="cursor-pointer" fontSize="inherit" />
          </div>
        )}
        <Button
          onClick={() => push("/stockRegisterBar/initial")}
          color="primary"
          fullWidth>
          Inicial
        </Button>
        <Button
          color="primary"
          onClick={() => push("/stockRegisterBar/movements")}
          fullWidth>
          Movimientos
        </Button>
      </div>
    </div>
  );
}
