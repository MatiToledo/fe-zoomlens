import { fetchDeleteRegisterBar } from "@/api/endpoints/register/bar";
import {
  fetchCreateUser,
  fetchDeleteUser,
  fetchEditUser,
} from "@/api/endpoints/user";
import { useGetAllBranchesByGroup } from "@/hooks/backoffice/branch";
import { useGetAllCompanies } from "@/hooks/backoffice/company";
import { useGetAllGroupsByCompany } from "@/hooks/backoffice/group";
import { User } from "@/types/models";
import { ControlledInput } from "@/ui/inputs/input";
import { ControlledPassword } from "@/ui/inputs/password";
import { ControlledSelect } from "@/ui/inputs/select";
import notify from "@/utils/notify";
import { rulesDNI } from "@/utils/rules/dni";
import { rulesEmail } from "@/utils/rules/email";
import { rulesPhone } from "@/utils/rules/phone";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";

type PropsType = {
  isOpen: boolean;
  onClose: () => void;
  mutate: () => void;
  rowSelected: User | null;
  setRowSelected: Dispatch<SetStateAction<User | null>>;
};

export default function UserForm({
  isOpen,
  onClose,
  mutate,
  rowSelected,
  setRowSelected,
}: PropsType) {
  const isEdit = !!rowSelected;
  const [photo, setPhoto] = useState<string>(isEdit ? rowSelected.photo : "");
  const {
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: isEdit ? rowSelected.fullName : "",
      email: isEdit ? rowSelected.email : "",
      password: "",
      dni: isEdit ? rowSelected.dni : "",
      phone: isEdit ? rowSelected.phone : "",
      role: isEdit ? rowSelected.role : undefined,
      CompanyId: isEdit ? rowSelected.CompanyId : undefined,
      GroupId: isEdit ? rowSelected.GroupId : undefined,
      BranchId: isEdit ? rowSelected.BranchId : undefined,
    },
  });

  const companies = useGetAllCompanies();
  const groups = useGetAllGroupsByCompany(watch("CompanyId"));
  const branches = useGetAllBranchesByGroup(watch("GroupId"));

  async function onSubmit(data: any) {
    const body = {
      Auth: {
        email: data.email.toLowerCase().trim(),
        password: data.password,
      },
      User: {
        fullName: data.fullName,
        dni: parseInt(data.dni),
        phone: parseInt(data.phone),
        role: data.role,
        BranchId: data.BranchId,
        photo: photo,
      },
    };
    isEdit
      ? await fetchEditUser(rowSelected.id, body)
      : await fetchCreateUser(body);
    mutate();
    reset();
    setRowSelected(null);
    onClose();
    notify(`Usuario ${isEdit ? "actualizado" : "creado"} con exito`, "success");
  }

  async function handleDelete() {
    if (!rowSelected) return;
    await fetchDeleteUser(rowSelected.id);
    mutate();
    reset();
    setRowSelected(null);
    onClose();
    notify("Usuario eliminado con exito", "success");
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
          {isEdit ? "Editar usuario" : "Crear usuario"}
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
          <ControlledInput
            control={control}
            name="phone"
            rules={rulesPhone}
            error={errors.phone}
            placeholder="Telefono"></ControlledInput>
          <ControlledInput
            control={control}
            name="dni"
            rules={rulesDNI}
            error={errors.dni}
            placeholder="DNI"></ControlledInput>
          <ControlledSelect
            name="role"
            control={control}
            label="Rol"
            error={errors.role}
            options={[
              { label: "Cajero", value: "register" },
              {
                label: "Cajero Caja",
                value: "registerBarClosure",
              },
              {
                label: "Cajero Boleteria",
                value: "registerTicketClosure",
              },
              { label: "Tesorero", value: "treasuryCentral" },
              { label: "Tesorero Nocturno", value: "treasuryNight" },
            ]}
            rules={{ required: true }}></ControlledSelect>
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
