import {
  fetchCreateRegisterBar,
  fetchDeleteRegisterBar,
  fetchEditRegisterBar,
} from "@/api/endpoints/register/bar";
import { useGetAllBranchesByGroup } from "@/hooks/backoffice/branch";
import { useGetAllCompanies } from "@/hooks/backoffice/company";
import { useGetAllGroupsByCompany } from "@/hooks/backoffice/group";
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
import { useForm } from "react-hook-form";

export default function RegisterBarForm({
  isOpen,
  onClose,
  mutate,
  rowSelected,
  setRowSelected,
}: any) {
  const isEdit = !!rowSelected;
  const {
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      CompanyId: isEdit ? rowSelected.CompanyId : undefined,
      GroupId: isEdit ? rowSelected.GroupId : undefined,
      BranchId: isEdit ? rowSelected.BranchId : undefined,
      name: isEdit ? rowSelected.name : "",
    },
  });

  const companies = useGetAllCompanies();
  const groups = useGetAllGroupsByCompany(watch("CompanyId"));
  const branches = useGetAllBranchesByGroup(watch("GroupId"));

  async function onSubmit(data: any) {
    delete data.CompanyId;
    delete data.GroupId;

    isEdit
      ? await fetchEditRegisterBar(rowSelected.id, data)
      : await fetchCreateRegisterBar(data);
    mutate();
    reset();
    setRowSelected(null);
    onClose();
    notify(`Barra ${isEdit ? "actualizada" : "creada"} con exito`, "success");
  }

  async function handleDelete() {
    await fetchDeleteRegisterBar(rowSelected.id);
    mutate();
    reset();
    setRowSelected(null);
    onClose();
    notify("Barra eliminada con exito", "success");
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
          {isEdit ? "Editar barra" : "Crear barra"}
        </ModalHeader>
        <ModalBody className="gap-6">
          <ControlledInput
            error={errors.name}
            control={control}
            rules={{ required: true }}
            name="name"
            placeholder="Nombre"></ControlledInput>
          <ControlledSelect
            size="md"
            rules={{ required: true }}
            options={companies}
            control={control}
            label="Compañia"
            name="CompanyId"></ControlledSelect>
          <ControlledSelect
            size="md"
            rules={{ required: true }}
            options={groups}
            control={control}
            label="Grupo"
            name="GroupId"></ControlledSelect>
          <ControlledSelect
            size="md"
            rules={{ required: true }}
            options={branches}
            control={control}
            label="Sucursal"
            name="BranchId"></ControlledSelect>
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
