import {
  fetchCreateBranch,
  fetchDeleteBranch,
  fetchEditBranch,
} from "@/api/endpoints/branch";
import { useGetAllCompanies } from "@/hooks/backoffice/company";
import { useGetAllGroupsByCompany } from "@/hooks/backoffice/group";
import { Branch } from "@/types/models";
import { ControlledInput } from "@/ui/inputs/input";
import { ControlledSelect } from "@/ui/inputs/select";
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
  rowSelected: Branch | null;
  setRowSelected: Dispatch<SetStateAction<Branch | null>>;
};

export default function BranchForm({
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
      CompanyId: isEdit ? rowSelected.CompanyId : undefined,
      GroupId: isEdit ? rowSelected.GroupId : undefined,
    },
  });

  const companies = useGetAllCompanies();
  const groups = useGetAllGroupsByCompany(watch("CompanyId"));
  async function onSubmit(data: any) {
    isEdit
      ? await fetchEditBranch(rowSelected.id, data)
      : await fetchCreateBranch(data);
    mutate();
    reset();
    setRowSelected(null);
    onClose();
    notify(`Grupo ${isEdit ? "actualizado" : "creado"} con exito`, "success");
  }

  async function handleDelete() {
    if (!rowSelected) return;
    await fetchDeleteBranch(rowSelected.id);
    mutate();
    reset();
    setRowSelected(null);
    onClose();
    notify("Grupo eliminado con exito", "success");
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
          {isEdit ? "Editar grupo" : "Crear grupo"}
        </ModalHeader>
        <ModalBody className="gap-6">
          <ControlledInput
            error={errors.name}
            control={control}
            rules={{ required: true }}
            name="name"
            placeholder="Nombre"></ControlledInput>
          {companies && (
            <ControlledSelect
              size="md"
              rules={{ required: true }}
              options={companies}
              control={control}
              label="Compania"
              name="CompanyId"></ControlledSelect>
          )}
          {groups && (
            <ControlledSelect
              size="md"
              rules={{ required: true }}
              options={groups}
              control={control}
              label="Grupo"
              name="GroupId"></ControlledSelect>
          )}
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
