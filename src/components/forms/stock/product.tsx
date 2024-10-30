import {
  fetchDeleteProduct,
  fetchEditProduct,
} from "@/api/endpoints/stock/product";
import { Product } from "@/types/models";
import { ControlledInput } from "@/ui/inputs/input";
import { ControlledTextArea } from "@/ui/inputs/textarea";
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
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";

type PropsType = {
  isOpen: boolean;
  onClose: () => void;
  mutate: () => void;
  rowSelected: Product | null;
  setRowSelected: Dispatch<SetStateAction<Product | null>>;
};

export default function StockProductForm({
  isOpen,
  onClose,
  mutate,
  rowSelected,
  setRowSelected,
}: PropsType) {
  const {
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: rowSelected?.name || "",
      price: rowSelected?.price || 0,
      observation: rowSelected?.observation || "",
    },
  });

  async function onSubmit(data: any) {
    if (!rowSelected) return;

    await fetchEditProduct(rowSelected.id, data);
    mutate();
    reset();
    setRowSelected(null);
    onClose();
    notify(`Producto actualizado con exito`, "success");
  }

  async function handleDelete() {
    if (!rowSelected) return;
    await fetchDeleteProduct(rowSelected.id);
    mutate();
    reset();
    setRowSelected(null);
    onClose();
    notify("Producto eliminado con exito", "success");
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
          Editar producto
        </ModalHeader>
        <ModalBody className="gap-6">
          <ControlledInput
            error={errors.name}
            control={control}
            rules={{ required: true }}
            name="name"
            placeholder="Nombre"></ControlledInput>
          <ControlledInput
            control={control}
            name="price"
            rules={rulesAmount}
            error={errors.price}
            placeholder="Precio"></ControlledInput>
          <ControlledTextArea
            control={control}
            name="observation"
            rules={{ required: false }}
            error={errors.observation}
            placeholder="Observacion"></ControlledTextArea>
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
