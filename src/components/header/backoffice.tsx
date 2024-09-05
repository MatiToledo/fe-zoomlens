import { usePathnameData } from "@/hooks/backoffice";
import { ADMINS_ROL_DICTIONARY } from "@/types/dictionaries";
import { UserBO } from "@/types/models";
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
import { useRouter } from "next/navigation";
import { Fragment } from "react";
import { mutate } from "swr";
import ThemeSwitch from "../themeSwitch";
export default function BOHeader({ user }: { user: UserBO }) {
  const isAdmin = user && user.role === "admin";
  const { isTreasury, isTreasuryNight, isClosure, pathname } =
    usePathnameData();

  const initialNames =
    user &&
    `${user.fullName.split(" ")[0][0]}${user.fullName.split(" ")[1][0]}`;
  const { push } = useRouter();
  function handleLogOut() {
    removeLSToken("backoffice");
    mutate((key) => true, undefined, { revalidate: false });
    push("/backoffice/logIn");
  }
  //TODO isActive
  const menuContent = [
    {
      title: "Cierres de caja",
      show: true,
      isActive: ["cash", "bank", "mp", "usd"].includes(pathname.split("/")[2]),
      options: [
        {
          label: "Operativas",
          link: "/backoffice/register/bar/closure",
        },
        {
          label: "Boleterias",
          link: "/backoffice/register/ticket/closure",
        },
      ],
    },
    {
      title: "Tesoreria nocturna",
      show: true,
      options: [
        {
          label: "Retiros",
          link: "/backoffice/treasury/night/retirement",
        },
        {
          label: "Retiros Finales",
          link: "/backoffice/treasury/night/retirementFinish",
        },
        {
          label: "Gastos",
          link: "/backoffice/treasury/night/expense",
        },
        {
          label: "Cierres",
          link: "/backoffice/treasury/night/cashRegister",
        },
      ],
    },
    {
      title: "Tesoreria central",
      show: true,
      options: [
        {
          label: "Efectivo",
          link: "/backoffice/treasury/central/register/cash",
        },
        {
          label: "Banco",
          link: "/backoffice/treasury/central/register/bank",
        },
        {
          label: "MP",
          link: "/backoffice/treasury/central/register/mp",
        },
        {
          label: "USD",
          link: "/backoffice/treasury/central/register/usd",
        },
        {
          label: "Contingencias",
          link: "/backoffice/treasury/central/flow/contingency",
        },
        {
          label: "Costos Fijos",
          link: "/backoffice/treasury/central/flow/fixedCost",
        },
        {
          label: "Obras",
          link: "/backoffice/treasury/central/flow/works",
        },
        {
          label: "Postnet Banco",
          link: "/backoffice/treasury/central/postnet/bank",
        },
        {
          label: "Postnet Mercado Pago",
          link: "/backoffice/treasury/central/postnet/mp",
        },
      ],
    },
    {
      title: "Gestion",
      show: isAdmin,
      isActive: ["cash", "bank", "mp", "usd"].includes(pathname.split("/")[2]),
      options: [
        {
          label: "Usuarios",
          link: "/backoffice/user",
        },
        {
          label: "Administradores",
          link: "/backoffice/admin",
        },
        { label: "Compañias", link: "/backoffice/company" },
        { label: "Grupos", link: "/backoffice/group" },
        { label: "Sucursales", link: "/backoffice/branch" },
        { label: "Barras", link: "/backoffice/register/bar" },
        { label: "Boleterias", link: "/backoffice/register/ticket" },
        { label: "Conceptos", link: "/backoffice/concept" },
      ],
    },
  ];
  return (
    <Navbar
      className="relative dark:bg-neutral-800 bg-neutral-100"
      isBordered
      maxWidth="full"
      isBlurred>
      <NavbarContent className="sm:flex gap-4" justify="start">
        <User
          name={user.fullName}
          description={`${ADMINS_ROL_DICTIONARY[user.role]}`}
          avatarProps={{
            src: user.photo,
            name: user.fullName,
            fallback: initialNames,
          }}
        />
      </NavbarContent>
      {menuContent.map((menu) => (
        <Fragment key={menu.title}>
          {menu.options && menu.show && (
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
      <NavbarContent
        className="hidden md:flex gap-6"
        justify="center"></NavbarContent>
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
            {menu.options && (
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
