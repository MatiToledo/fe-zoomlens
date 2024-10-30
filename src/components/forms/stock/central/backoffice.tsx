import {
  fetchDeleteStockCentral,
  fetchEditStockCentral,
} from "@/api/endpoints/stock/central";
import { useAllProductsByBranchId } from "@/hooks/stock/product";
import { StockCentral } from "@/types/models";
import { ControlledInput } from "@/ui/inputs/input";
import { ControlledSelect } from "@/ui/inputs/select";
import notify from "@/utils/notify";
import { rulesAmount } from "@/utils/rules/amount";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { UUID } from "crypto";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";

type PropsType = {
  isOpen: boolean;
  onClose: () => void;
  mutate: () => void;
  rowSelected: StockCentral | null;
  setRowSelected: Dispatch<SetStateAction<StockCentral | null>>;
  BranchId: UUID;
};

export default function StockCentralBOForm({
  isOpen,
  onClose,
  mutate,
  rowSelected,
  setRowSelected,
  BranchId,
}: PropsType) {
  const {
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      initial: rowSelected?.initial || "",
      entries: rowSelected?.entries || "",
      exits: rowSelected?.exits || "",
      ProductId: rowSelected?.ProductId || undefined,
    },
  });

  const { products } = useAllProductsByBranchId(BranchId);

  async function onSubmit(data: any) {
    if (!rowSelected) return;
    data.initial = parseFloat(data.initial);
    data.entries = parseFloat(data.entries) || 0;
    data.exits = parseFloat(data.exits) || 0;

    await fetchEditStockCentral(rowSelected.id, data);
    mutate();
    reset();
    setRowSelected(null);
    onClose();
    notify(`Stock central actualizado con exito`, "success");
  }

  async function handleDelete() {
    if (!rowSelected) return;
    await fetchDeleteStockCentral(rowSelected.id);
    mutate();
    reset();
    setRowSelected(null);
    onClose();
    notify("Stock central eliminado con exito", "success");
  }

  return (
    <Modal
      backdrop={"opaque"}
      isOpen={isOpen}
      onClose={() => {
        setRowSelected(null);
        onClose();
      }}
      scrollBehavior="inside">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Editar stock central
        </ModalHeader>
        <ModalBody className="gap-6">
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
            error={errors.initial}
            control={control}
            rules={{ required: true }}
            name="initial"
            placeholder="Inicial"></ControlledInput>
          <ControlledInput
            control={control}
            name="exits"
            rules={rulesAmount}
            error={errors.exits}
            placeholder="Salidas"></ControlledInput>
          <ControlledInput
            control={control}
            name="entries"
            rules={{ required: false }}
            error={errors.entries}
            placeholder="Compras"></ControlledInput>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="flat" onPress={handleDelete}>
            Eliminar
          </Button>
          <Button color="primary" onClick={handleSubmit(onSubmit)}>
            Editar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
