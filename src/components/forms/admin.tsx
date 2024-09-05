import {
  fetchCreateAdmin,
  fetchDeleteAdmin,
  fetchEditAdmin,
} from "@/api/endpoints/user";
import { useGetAllCompanies } from "@/hooks/backoffice/company";
import { User, UserBO } from "@/types/models";
import { ControlledInput } from "@/ui/inputs/input";
import { ControlledPassword } from "@/ui/inputs/password";
import { ControlledSelect } from "@/ui/inputs/select";
import notify from "@/utils/notify";
import { rulesEmail } from "@/utils/rules/email";
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
  rowSelected: UserBO | null;
  setRowSelected: Dispatch<SetStateAction<UserBO | null>>;
};

export default function AdminForm({
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
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: isEdit ? rowSelected.fullName : "",
      email: isEdit ? rowSelected.email : "",
      password: "",
      role: isEdit ? rowSelected.role : undefined,
      CompanyId: isEdit ? rowSelected.CompanyId : undefined,
    },
  });

  const companies = useGetAllCompanies();

  async function onSubmit(data: any) {
    const body = {
      Auth: {
        email: data.email.toLowerCase().trim(),
        password: data.password === "" ? undefined : data.password,
      },
      User: {
        fullName: data.fullName,
        role: data.role,
        CompanyId: data.role === "admin" ? null : data.CompanyId,
      },
    };
    isEdit
      ? await fetchEditAdmin(rowSelected.id, body)
      : await fetchCreateAdmin(body);
    mutate();
    reset();
    setRowSelected(null);
    onClose();
    notify(
      `Administrador ${isEdit ? "actualizado" : "creado"} con exito`,
      "success"
    );
  }

  async function handleDelete() {
    if (!rowSelected) return;
    await fetchDeleteAdmin(rowSelected.id);
    mutate();
    reset();
    setRowSelected(null);
    onClose();
    notify("Administrador eliminado con exito", "success");
  }

  const isPartnerSelected = watch("role") === "partner";
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
          {isEdit ? "Editar administrador" : "Crear administrador"}
        </ModalHeader>
        <ModalBody className="gap-6">
          <ControlledInput
            error={errors.fullName}
            control={control}
            rules={{ required: true }}
            name="fullName"
            placeholder="Nombre"></ControlledInput>
          <ControlledInput
            control={control}
            name="email"
            rules={rulesEmail}
            error={errors.email}
            placeholder="Email"></ControlledInput>
          <ControlledPassword
            control={control}
            name="password"></ControlledPassword>

          <ControlledSelect
            name="role"
            control={control}
            label="Rol"
            error={errors.role}
            options={[
              { label: "Administrador", value: "admin" },
              { label: "Socio", value: "partner" },
            ]}
            rules={{ required: true }}></ControlledSelect>
          {isPartnerSelected && (
            <ControlledSelect
              size="md"
              rules={{ required: true }}
              options={companies}
              control={control}
              label="Compañia"
              name="CompanyId"></ControlledSelect>
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
