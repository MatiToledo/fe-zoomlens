import { fetchCreateUser } from "@/api/endpoints/user";
import { EmailIcon } from "@/ui/icons/email";
import { UserIcon } from "@/ui/icons/user";
import { UploadImageInput } from "@/ui/inputs/image";
import { ControlledInput } from "@/ui/inputs/input";
import { ControlledPassword } from "@/ui/inputs/password";
import { ControlledSelect } from "@/ui/inputs/select";
import notify from "@/utils/notify";
import { rulesDNI } from "@/utils/rules/dni";
import { rulesEmail } from "@/utils/rules/email";
import { rulesFullName } from "@/utils/rules/fullName";
import { rulesPassword } from "@/utils/rules/password";
import { rulesPhone } from "@/utils/rules/phone";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

const defaultValues = {
  email: "",
  password: "",
  fullName: "",
  dni: "",
  phone: "",
  role: undefined,
};

export default function ModalCreateUserRegister({
  isOpen,
  onClose,
  BranchId,
}: any) {
  const [photo, setPhoto] = useState<string>("");

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty, isSubmitting, isValid },
  } = useForm({
    defaultValues,
  });

  async function onSubmit(data: FieldValues) {
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
        BranchId: BranchId,
        photo: photo,
      },
    };
    await fetchCreateUser(body);
    setPhoto("");
    reset();
    onClose();
    notify("Usuario creado con exito", "success");
  }

  function handleClose() {
    setPhoto("");
    reset();
    onClose();
  }

  return (
    <>
      <Modal
        backdrop={"opaque"}
        isOpen={isOpen}
        onClose={handleClose}
        scrollBehavior="inside">
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1 ">
              Crear usuario
            </ModalHeader>
            <ModalBody className="gap-6 min-h-[328px] ">
              <ControlledInput
                name="fullName"
                placeholder="Nombre"
                control={control}
                rules={rulesFullName}
                error={errors.fullName}
                startContent={
                  <UserIcon className="text-base text-default-400" />
                }></ControlledInput>
              <ControlledInput
                name="email"
                placeholder="Email"
                control={control}
                rules={rulesEmail}
                error={errors.email}
                startContent={
                  <EmailIcon className="text-base text-default-400" />
                }></ControlledInput>
              <ControlledPassword
                name="password"
                placeholder="Contraseña"
                control={control}
                rules={rulesPassword}
                error={errors.password}></ControlledPassword>
              <ControlledInput
                name="phone"
                placeholder="Telefono"
                control={control}
                rules={rulesPhone}
                error={errors.phone}
                startContent={
                  <EmailIcon className="text-base text-default-400" />
                }></ControlledInput>
              <ControlledInput
                name="dni"
                placeholder="DNI"
                control={control}
                rules={rulesDNI}
                error={errors.dni}
                startContent={
                  <EmailIcon className="text-base text-default-400" />
                }></ControlledInput>
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
                ]}
                rules={{ required: true }}></ControlledSelect>
              <UploadImageInput
                photo={photo}
                setPhoto={setPhoto}></UploadImageInput>
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                isLoading={isSubmitting}
                isDisabled={!isDirty && !isValid}
                onClick={handleSubmit(onSubmit)}>
                Crear
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}
