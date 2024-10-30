"use client";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";

export default function StockCentralComponent() {
  const { push } = useRouter();

  return (
    <div className="h-[calc(100vh-65px)] p-5 w-full  flex justify-center items-center">
      <div className="flex flex-col container mx-auto p-4 gap-4 max-w-md h-full grow justify-center">
        <Button
          onClick={() => push("/stockCentral/products")}
          color="primary"
          fullWidth>
          Productos
        </Button>
        <Button
          color="primary"
          onClick={() => push("/stockCentral/counting")}
          fullWidth>
          Conteo
        </Button>
        <Button
          color="primary"
          onClick={() => push("/stockCentral/update?type=entry")}
          fullWidth>
          Compras
        </Button>
        <Button
          color="primary"
          onClick={() => push("/stockCentral/update?type=exit")}
          fullWidth>
          Salidas
        </Button>
      </div>
    </div>
  );
}
