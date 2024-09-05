import TreasuryNightExpenseForm from "@/components/forms/treasury/night/expense";
import TreasuryNightRetirementForm from "@/components/forms/treasury/night/retirement";
import TreasuryNightRetirementFinishForm from "@/components/forms/treasury/night/retirementFinish";
import { User } from "@/types/models";
import { BackIcon } from "@/ui/icons/back";
import { PlusIcon } from "@/ui/icons/plus";
import ControlledDatePicker from "@/ui/inputs/datePicker";
import {
  Button,
  CalendarDate,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { KeyedMutator } from "swr";
import ExportTable from "./exportTable";
import { FolderIcon } from "@/ui/icons/folder";
import CashRegisterForm from "@/components/forms/cashRegister";

type PropsType = {
  user: User;
  data: any;
  date: CalendarDate;
  setDate: Dispatch<SetStateAction<CalendarDate>>;
  mutate: KeyedMutator<any>;
};

export default function HeaderMovements({
  user,
  data,
  date,
  setDate,
  mutate,
}: PropsType) {
  const { push } = useRouter();

  const {
    isOpen: isOpenRetirement,
    onClose: onCloseRetirement,
    onOpen: onOpenRetirement,
  } = useDisclosure();
  const {
    isOpen: isOpenRetirementFinish,
    onClose: onCloseRetirementFinish,
    onOpen: onOpenRetirementFinish,
  } = useDisclosure();
  const {
    isOpen: isOpenExpense,
    onClose: onCloseExpense,
    onOpen: onOpenExpense,
  } = useDisclosure();
  const {
    isOpen: isOpenCashRegister,
    onClose: onCloseCashRegister,
    onOpen: onOpenCashRegister,
  } = useDisclosure();

  return (
    <div className="w-full flex justify-between items-center mb-8 gap-5">
      <div className="md:min-w-[152px] ">
        <BackIcon
          onClick={() => push("/treasuryNight")}
          style={{ cursor: "pointer" }}
          fontSize="inherit"
        />
      </div>
      <ControlledDatePicker
        date={date}
        setDate={setDate}></ControlledDatePicker>
      <div className="flex gap-4">
        <Button
          isIconOnly
          onClick={onOpenCashRegister}
          className="bg-foreground text-background"
          endContent={<FolderIcon size={17} />}></Button>
        <Dropdown>
          <DropdownTrigger>
            <Button
              isIconOnly
              className="bg-foreground text-background"
              endContent={<PlusIcon />}></Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions" className="">
            <DropdownItem key="expense" onClick={onOpenExpense}>
              Cargar egreso
            </DropdownItem>
            <DropdownItem key="retirement" onClick={onOpenRetirement}>
              Cargar retiro
            </DropdownItem>
            <DropdownItem
              key="retirementFinish"
              onClick={onOpenRetirementFinish}>
              Cargar retiro final
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <ExportTable date={date} data={data}></ExportTable>
      </div>
      {isOpenExpense && (
        <TreasuryNightExpenseForm
          isModal
          mutate={mutate}
          BranchId={user.BranchId}
          isOpen={isOpenExpense}
          onClose={onCloseExpense}></TreasuryNightExpenseForm>
      )}
      {isOpenRetirement && (
        <TreasuryNightRetirementForm
          isModal
          mutate={mutate}
          BranchId={user.BranchId}
          isOpen={isOpenRetirement}
          onClose={onCloseRetirement}></TreasuryNightRetirementForm>
      )}
      {isOpenRetirementFinish && (
        <TreasuryNightRetirementFinishForm
          isModal
          mutate={mutate}
          BranchId={user.BranchId}
          isOpen={isOpenRetirementFinish}
          onClose={onCloseRetirementFinish}></TreasuryNightRetirementFinishForm>
      )}
      {isOpenCashRegister && (
        <CashRegisterForm
          isModal
          BranchId={user.BranchId}
          mutate={mutate}
          CompanyName={user.CompanyName}
          BranchName={user.BranchName}
          isOpen={isOpenCashRegister}
          onClose={onCloseCashRegister}></CashRegisterForm>
      )}
    </div>
  );
}
