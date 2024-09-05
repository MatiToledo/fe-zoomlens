import { USER_ROL_DICTIONARY } from "@/types/dictionaries";
import { removeLSToken } from "@/utils/localStorage";
import { useDisclosure } from "@nextui-org/modal";
import { Navbar, NavbarContent, NavbarItem } from "@nextui-org/navbar";
import { User } from "@nextui-org/user";
import { useRouter } from "next/navigation";
import { mutate } from "swr";
import { User as UserModel } from "@/types/models";
import { LogOutIcon } from "@/ui/icons/logOut";
import { UserPlusIcon } from "@/ui/icons/user";
import ModalCreateUserRegister from "../forms/register";
import ThemeSwitch from "../themeSwitch";

export default function Header({ me }: { me: UserModel }) {
  const { push } = useRouter();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const initialNames =
    me && `${me.fullName.split(" ")[0][0]}${me.fullName.split(" ")[1][0]}`;

  function handleLogOut() {
    removeLSToken("user");
    mutate((key) => true, undefined, { revalidate: false });
    push("/logIn");
  }
  return (
    <>
      {me && (
        <>
          <Navbar
            isBordered
            maxWidth="full"
            isBlurred
            className="relative dark:bg-neutral-800 bg-neutral-100">
            <NavbarContent className="sm:flex gap-4 flex grow" justify="start">
              <User
                name={me.fullName}
                description={`${me.CompanyName} - ${me.BranchName} - ${
                  USER_ROL_DICTIONARY[me.role]
                }`}
                avatarProps={{
                  src: me.photo,
                  name: me.fullName,
                  fallback: initialNames,
                }}
              />
            </NavbarContent>

            <NavbarContent className="sm:flex max-w-[20px]" justify="end">
              <ThemeSwitch />
              <div className="flex items-center gap-3">
                {me.role === "treasuryNight" && (
                  <NavbarItem>
                    <UserPlusIcon
                      className="cursor-pointer"
                      onClick={onOpen}></UserPlusIcon>
                  </NavbarItem>
                )}
                <NavbarItem>
                  <LogOutIcon
                    className="cursor-pointer"
                    onClick={handleLogOut}></LogOutIcon>
                </NavbarItem>
              </div>
            </NavbarContent>
          </Navbar>
          {me.role === "treasuryNight" && me?.BranchId && (
            <ModalCreateUserRegister
              isOpen={isOpen}
              onClose={onClose}
              BranchId={me.BranchId}></ModalCreateUserRegister>
          )}
        </>
      )}
    </>
  );
}
