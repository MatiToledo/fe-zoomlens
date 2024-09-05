"use client";
import { fetchLogInBackOffice } from "@/api/endpoints/auth";
import { fetchAdminMe } from "@/api/endpoints/user";
import { UserIcon } from "@/ui/icons/user";
import { ControlledInput } from "@/ui/inputs/input";
import { ControlledPassword } from "@/ui/inputs/password";
import { saveLSToken } from "@/utils/localStorage";
import { rulesEmail } from "@/utils/rules/email";
import { rulesPassword } from "@/utils/rules/password";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
const defaultValues = {
  email: "",
  password: "",
};

export default function BOLogInForm() {
  const { push } = useRouter();
  const [cookies, setCookie] = useCookies(["user"]);

  const {
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting, isDirty },
  } = useForm({
    defaultValues: defaultValues,
  });

  async function onSubmit(data: any) {
    const fetch = await fetchLogInBackOffice(data.email, data.password);
    saveLSToken(fetch.token, "backoffice");
    const admin = await fetchAdminMe();
    setCookie("user", admin, { path: "/" });
    push("/backoffice/register/bar/closure");
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center justify-center gap-8 w-full mt-6">
      <ControlledInput
        type="string"
        error={errors.email}
        control={control}
        rules={rulesEmail}
        name="email"
        placeholder="Email"
        startContent={
          <UserIcon className="text-base text-default-400" />
        }></ControlledInput>
      <ControlledPassword
        placeholder={"Contraseña"}
        control={control}
        name={"password"}
        rules={rulesPassword}
        error={errors.password}></ControlledPassword>
      <Button
        type="submit"
        className="w-full"
        isLoading={isSubmitting}
        isDisabled={!isDirty && !isValid}
        color="primary">
        {isSubmitting ? "" : "Ingresar"}
      </Button>
    </form>
  );
}
