"use client";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";

export default function TreasuryNightComponent() {
  const { push } = useRouter();
  return (
    <div className="h-[calc(100vh-65px)] p-5 w-full  flex justify-center items-center">
      <div className="container flex flex-col max-w-md gap-5">
        <Button
          onClick={() => push("/treasuryNight/retirement")}
          color="primary"
          fullWidth>
          Cargar retiro
        </Button>
        <Button
          color="primary"
          onClick={() => push("/treasuryNight/expense")}
          fullWidth>
          Cargar egreso
        </Button>
        <Button
          color="primary"
          onClick={() => push("/treasuryNight/retirementFinish")}
          fullWidth>
          Cargar retiro final
        </Button>
        <Button
          color="primary"
          onClick={() => push("/treasuryNight/resume")}
          fullWidth>
          Ver movimientos
        </Button>
        <Button
          color="primary"
          onClick={() => push("/treasuryNight/cashRegister")}
          fullWidth>
          Cierre de caja
        </Button>
      </div>
    </div>
  );
}
