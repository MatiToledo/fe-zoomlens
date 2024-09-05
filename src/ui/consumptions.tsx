export interface Consumptions {
  id: string;
  description: string;
  quantity: number;
}
import { Input } from "@nextui-org/input";
import { Dispatch, SetStateAction } from "react";
import { v4 as uuid } from "uuid";
import { DeleteIcon } from "./icons/delete";
import { PlusIcon } from "./icons/plus";

export default function ConsumptionsInput({
  consumptions,
  setConsumptions,
}: {
  consumptions: Consumptions[];
  setConsumptions: Dispatch<SetStateAction<Consumptions[]>>;
}) {
  const handleAddConsumption = () => {
    setConsumptions([
      ...consumptions,
      { id: uuid(), description: "", quantity: 0 },
    ]);
  };

  const handleConsumptionChange = (
    id: string,
    field: "description" | "quantity",
    value: any
  ) => {
    const updatedConsumptions = consumptions.map((consumption) =>
      consumption.id === id
        ? {
            ...consumption,
            [field]:
              field === "quantity"
                ? parseInt(value === "" ? "0" : value)
                : value,
          }
        : consumption
    );
    setConsumptions(updatedConsumptions);
  };

  const handleDeleteConsumption = (id: string) => {
    const updatedConsumptions = consumptions.filter(
      (consumption) => consumption.id !== id
    );
    setConsumptions(updatedConsumptions);
  };

  return (
    <div className="flex flex-col gap-2 w-full h-auto">
      <h3 className="text-xl mb-2">Consumiciones</h3>
      {consumptions.map((consumption) => (
        <div className="flex gap-2 items-center" key={consumption.id}>
          <Input
            label="Detalle"
            fullWidth
            value={consumption.description}
            onChange={(e) =>
              handleConsumptionChange(
                consumption.id,
                "description",
                e.target.value
              )
            }
            name="consumptions"
          />
          <div className="max-w-[10px]">
            <Input
              label="Cant"
              fullWidth
              value={consumption.quantity.toString()}
              onChange={(e) =>
                handleConsumptionChange(
                  consumption.id,
                  "quantity",
                  e.target.value
                )
              }
              name="cant"
            />
          </div>
          <div className="min-w-[30px] cursor-pointer">
            <DeleteIcon
              onClick={() =>
                handleDeleteConsumption(consumption.id)
              }></DeleteIcon>
          </div>
        </div>
      ))}
      <div
        className="flex gap-2 justify-end "
        onClick={handleAddConsumption}
        style={{ backgroundColor: "transparent" }}
        aria-label="delete">
        <p className="text-sm">Agregar consumicion</p>
        <PlusIcon className="cursor-pointer" fontSize="inherit" />
      </div>
    </div>
  );
}
