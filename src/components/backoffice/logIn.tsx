import { title } from "@/config/primitives";
import { Image } from "@nextui-org/image";
import BOLogInForm from "../forms/logIn/backoffice";

export default function BOLogInComponent() {
  return (
    <div className="bg-default-300 w-screen h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4 w-[90%] max-w-[350px]">
        <Image
          className="rounded-none"
          src="/logo.png"
          alt="logo"
          width={240}
          height={145}
        />
        <h1 className={title()}>Ingresa a tu cuenta administrador</h1>
        <BOLogInForm></BOLogInForm>
      </div>
    </div>
  );
}
