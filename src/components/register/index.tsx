"use client";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";

export default function RegisterComponent() {
  const { push } = useRouter();

  return (
    <div className="h-[calc(100vh-65px)] p-5 w-full  flex justify-center items-center">
      <div className="flex flex-col container mx-auto p-4 gap-4 max-w-md h-full grow justify-center">
        <Button
          onClick={() => push("/stockRegisterBar")}
          color="primary"
          fullWidth>
          Stock
        </Button>
        <Button
          onClick={() => push("/registerBarClosure")}
          color="primary"
          fullWidth>
          Cierre de caja operativa barras
        </Button>
        <Button
          color="primary"
          onClick={() => push("/registerTicketClosure")}
          fullWidth>
          Cierre de caja operativa boleteria
        </Button>
      </div>
    </div>
  );
}
