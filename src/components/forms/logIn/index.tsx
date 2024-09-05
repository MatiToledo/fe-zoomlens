"use client";
import { fetchLogIn } from "@/api/endpoints/auth";
import { fetchUserMe } from "@/api/endpoints/user";
import { UserIcon } from "@/ui/icons/user";
import { ControlledInput } from "@/ui/inputs/input";
import { ControlledPassword } from "@/ui/inputs/password";
import { saveLSToken } from "@/utils/localStorage";
import { rulesEmail } from "@/utils/rules/email";
import { rulesPassword } from "@/utils/rules/password";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { FieldValues, useForm } from "react-hook-form";
const defaultValues = {
  email: "",
  password: "",
};

export default function LogInForm() {
  const { push } = useRouter();
  const [cookies, setCookie] = useCookies(["user"]);

  const {
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting, isDirty },
  } = useForm({
    defaultValues: defaultValues,
  });

  async function onSubmit(data: FieldValues) {
    const fetch = await fetchLogIn(
      data.email.toLowerCase().trim(),
      data.password
    );
    saveLSToken(fetch.token, "user");
    const user = await fetchUserMe();
    setCookie("user", user, { path: "/" });

    if (fetch.role === "treasuryCentral") {
      push("/treasuryCentral/register/cash");
    } else {
      push(`/${fetch.role}`);
    }
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
