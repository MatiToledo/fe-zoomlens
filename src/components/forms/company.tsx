import {
  fetchCreateCompany,
  fetchDeleteCompany,
  fetchEditCompany,
} from "@/api/endpoints/company";
import { Company } from "@/types/models";
import { ControlledInput } from "@/ui/inputs/input";
import notify from "@/utils/notify";
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
  rowSelected: Company | null;
  setRowSelected: Dispatch<SetStateAction<Company | null>>;
};

export default function CompanyForm({
  isOpen,
  onClose,
  mutate,
  rowSelected,
  setRowSelected,
}: PropsType) {
  const isEdit = !!rowSelected;
  const {
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: isEdit ? rowSelected.name : "",
    },
  });

  async function onSubmit(data: any) {
    isEdit
      ? await fetchEditCompany(rowSelected.id, data)
      : await fetchCreateCompany(data);
    mutate();
    reset();
    setRowSelected(null);
    onClose();
    notify(
      `Compañia ${isEdit ? "actualizado" : "creado"} con exito`,
      "success"
    );
  }

  async function handleDelete() {
    if (!rowSelected) return;
    await fetchDeleteCompany(rowSelected.id);
    mutate();
    reset();
    setRowSelected(null);
    onClose();
    notify("Compañia eliminado con exito", "success");
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
          {isEdit ? "Editar compañia" : "Crear compañia"}
        </ModalHeader>
        <ModalBody className="gap-6">
          <ControlledInput
            error={errors.name}
            control={control}
            rules={{ required: true }}
            name="name"
            placeholder="Nombre"></ControlledInput>
        </ModalBody>
        <ModalFooter>
          {isEdit && (
            <Button color="danger" variant="flat" onPress={handleDelete}>
              Eliminar
            </Button>
          )}
          <Button color="primary" onClick={handleSubmit(onSubmit)}>
            {isEdit ? "Editar" : "Crear"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
