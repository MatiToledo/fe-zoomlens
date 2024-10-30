import { fetchUpdateStockCentral } from "@/api/endpoints/stock/central";
import { useAllProductsByBranchId } from "@/hooks/stock/product";
import { ControlledInput } from "@/ui/inputs/input";
import { ControlledSelect } from "@/ui/inputs/select";
import { formattedToday } from "@/utils/formatedToday";
import notify from "@/utils/notify";
import { Button } from "@nextui-org/react";
import { UUID } from "crypto";
import { useForm } from "react-hook-form";
import { parseDate } from "@internationalized/date";
import getWeekOfMonth from "@/utils/getWeekOfMonth";
import { useRouter } from "next/navigation";

export default function StockCentralForm({
  BranchId,
  type,
}: {
  BranchId: UUID;
  type: string | null;
}) {
  const { push } = useRouter();
  const {
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors, isDirty, isSubmitting, isValid },
  } = useForm({
    defaultValues: {
      ProductId: undefined,
      quantity: "",
      BranchId: BranchId,
    },
  });

  const { products } = useAllProductsByBranchId(BranchId);

  async function onSubmit(data: any) {
    const today = parseDate(formattedToday);
    const month = today.month;
    const week = getWeekOfMonth(today);
    data.month = month;
    data.week = week;

    if (type === "entry") {
      data.entries = parseFloat(data.quantity);
    } else {
      data.exits = parseFloat(data.quantity);
    }
    delete data.quantity;
    await fetchUpdateStockCentral(data);

    notify(
      `${type === "entry" ? "Compra" : "Salida"} creada con exito`,
      "success"
    );
    reset();
    push(`/stockCentral`);
  }

  return (
    <div className="mt-8 flex flex-col gap-5 w-10/12 max-w-[350px]">
      <ControlledSelect
        size="md"
        rules={{ required: true }}
        options={products.map((product: any) => ({
          label: product.name,
          value: product.id,
        }))}
        control={control}
        label="Producto"
        name="ProductId"></ControlledSelect>

      <ControlledInput
        error={errors.quantity}
        control={control}
        rules={{ required: true }}
        name="quantity"
        placeholder="Cantidad"></ControlledInput>
      <Button
        onClick={handleSubmit(onSubmit)}
        className="w-full"
        isLoading={isSubmitting}
        isDisabled={!isDirty && !isValid}
        color="primary">
        {isSubmitting ? "" : "Cargar"}
      </Button>
    </div>
  );
}
