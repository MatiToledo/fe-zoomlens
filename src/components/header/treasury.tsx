import { USER_ROL_DICTIONARY } from "@/types/dictionaries";
import { User as UserModel } from "@/types/models";
import { ChevronDown } from "@/ui/icons/chevron";
import { LogOutIcon } from "@/ui/icons/logOut";
import { removeLSToken } from "@/utils/localStorage";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/navbar";
import { User } from "@nextui-org/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import ThemeSwitch from "../themeSwitch";
import { Fragment } from "react";
import { mutate } from "swr";
export default function HeaderTreasury({ user }: { user: UserModel }) {
  const { push } = useRouter();
  const pathname = usePathname();
  const initialNames =
    user &&
    `${user.fullName.split(" ")[0][0]}${user.fullName.split(" ")[1][0]}`;

  function handleLogOut() {
    removeLSToken("user");
    mutate((key) => true, undefined, { revalidate: false });
    push("/logIn");
  }

  const menuContent = [
    {
      title: "Cajas",
      isActive: ["cash", "bank", "mp", "usd"].includes(pathname.split("/")[2]),
      options: [
        {
          label: "Efectivo",
          link: "/treasuryCentral/register/cash",
        },
        {
          label: "Banco",
          link: "/treasuryCentral/register/bank",
        },
        {
          label: "Mercado Pago",
          link: "/treasuryCentral/register/mp",
        },
        {
          label: "Dolares",
          link: "/treasuryCentral/register/usd",
        },
      ],
    },
    {
      title: "Flujos",
      options: [
        {
          label: "Costos Fijos",
          link: "/treasuryCentral/flow/fixedCosts",
        },
        {
          label: "Obras",
          link: "/treasuryCentral/flow/works",
        },
        {
          label: "Contingencias",
          link: "/treasuryCentral/flow/contingency",
        },
      ],
    },
    {
      title: "Postnets",
      isActive: ["postnets"].includes(pathname),
      options: [
        {
          label: "Banco",
          link: "/treasuryCentral/postnet/bank",
        },
        {
          label: "MP",
          link: "/treasuryCentral/postnet/mp",
        },
      ],
    },
    {
      title: "Calculo CF",
      isActive: ["fixedCostsCalculation"].includes(pathname),
      link: "/treasuryCentral/fixedCostsCalculation",
    },
  ];

  return (
    <Navbar
      isBordered
      maxWidth="full"
      className="relative dark:bg-neutral-800 bg-neutral-100"
      isBlurred>
      <NavbarContent className="sm:flex gap-4 flex grow" justify="start">
        <User
          name={user.fullName}
          description={`${user.CompanyName} - ${user.BranchName} - ${
            USER_ROL_DICTIONARY[user.role]
          }`}
          avatarProps={{
            src: user.photo,
            name: user.fullName,
            fallback: initialNames,
          }}
        />
      </NavbarContent>
      <NavbarContent className="hidden md:flex gap-6" justify="center">
        {menuContent.map((menu) => (
          <Fragment key={menu.title}>
            {!menu.options && (
              <NavbarItem>
                <Link color="foreground" href={menu.link}>
                  {menu.title}
                </Link>
              </NavbarItem>
            )}
            {menu.options && (
              <Dropdown>
                <NavbarItem isActive={menu.isActive}>
                  <DropdownTrigger>
                    <Button
                      disableRipple
                      className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                      endContent={<ChevronDown fill="currentColor" size={16} />}
                      radius="sm"
                      size="lg"
                      variant="light">
                      {menu.title}
                    </Button>
                  </DropdownTrigger>
                </NavbarItem>
                <DropdownMenu
                  itemClasses={{
                    base: "gap-4",
                  }}>
                  {menu.options.map((option) => (
                    <DropdownItem href={option.link} key={option.label}>
                      {option.label}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            )}
          </Fragment>
        ))}
      </NavbarContent>
      <NavbarContent className="sm:flex" justify="end">
        <ThemeSwitch />
        <NavbarItem className="hidden md:flex">
          <LogOutIcon
            className="cursor-pointer"
            onClick={handleLogOut}></LogOutIcon>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenuToggle className="md:hidden" />
      <NavbarMenu className="text-right">
        {menuContent.map((menu) => (
          <Fragment key={menu.title}>
            {menu.options ? (
              <>
                <p className="text-normal text-foreground-500">{menu.title}</p>
                {menu.options.map((option) => (
                  <NavbarMenuItem key={option.label}>
                    <Link className="w-full pl-3" href={option.link}>
                      {option.label}
                    </Link>
                  </NavbarMenuItem>
                ))}
              </>
            ) : (
              <NavbarMenuItem>
                <Link className="w-full pl-3" href={menu.link}>
                  {menu.title}
                </Link>
              </NavbarMenuItem>
            )}
            <Divider />
          </Fragment>
        ))}
        <NavbarMenuItem>
          <p className="w-full pl-3 text-red-500" onClick={handleLogOut}>
            Cerrar sesion
          </p>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
