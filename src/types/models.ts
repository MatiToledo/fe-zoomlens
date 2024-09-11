import { UUID } from "crypto";
import {
  FixedCostTypeEnum,
  RegisterTypeEnum,
  RetirementFinishTypeEnum,
  RetirementTypeEnum,
  UserBORoleEnum,
  UserRoleEnum,
} from "./enum";
import { Tickets } from "@/ui/tickets";
import { Consumptions } from "@/ui/consumptions";

interface Model {
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  isEdited?: boolean;
}

export interface Auth extends Model {
  id: UUID;
  email: string;
  password: string;
}

export interface User extends Model {
  id: UUID;
  fullName: string;
  phone: number;
  photo: string;
  role: UserRoleEnum;
  dni: number;
  email: string;
  AuthId: UUID;
  Auth: Auth;
  BranchId: UUID;
  CompanyId: UUID;
  GroupId: UUID;
  Branch: Branch;
  BranchName: string;
  GroupName: string;
  CompanyName: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserBO extends Model {
  id: UUID;
  photo: string;
  email: string;
  fullName: string;
  role: UserBORoleEnum;
  AuthBOId: UUID;
  AuthBO: Auth;
  BranchId: UUID;
  CompanyId: UUID;
}

export interface Branch extends Model {
  id: UUID;
  name: string;
  GroupId: UUID;
  Group: Group;
  RegisterBars: RegisterBar[];
  RegisterTickets: RegisterTicket[];
  barsCant: number;
  ticketsCant: number;
  GroupName: string;
  CompanyName: string;
  CompanyId: UUID;
}
export interface Group extends Model {
  id: UUID;
  name: string;
  CompanyId: UUID;
  Company: Company;
  Branches: Branch[];
  branchesCant: number;
  CompanyName: string;
}

export interface Company extends Model {
  id: UUID;
  name: string;
  Groups: Group[];
  groupsCant: number;
  branchesCant: number;
  branches: Branch[];
}

export interface RegisterBar extends Model {
  id: UUID;
  name: string;
  BranchId: UUID;
  Branch: Branch;
  BranchName: string;
  GroupName: string;
  CompanyName: string;
}
export interface RegisterTicket extends Model {
  id: UUID;
  name: string;
  BranchId: UUID;
  Branch: Branch;
  BranchName: string;
  GroupName: string;
  CompanyName: string;
}
export interface CashRegister extends Model {
  id: UUID;

  date: Date;
  amountActual: number;
  amountTheoretical: number;
  retirementsTotal: number;
  retirementsFinishTotal: number;
  retirementsFinishExpensesTotal: number;
  treasuryExpensesTotal: number;
  expensesTotal: number;
  cashTotal: number;
  transfersTotal: number;
  postnetTotal: number;
  difference: number;
  earnedAccount: number;
  comment: string;
  BranchName: string;
  GroupName: string;
  CompanyName: string;

  BranchId: UUID;
  Branch: Branch;
}
export interface RegisterBarClosure extends Model {
  id: UUID;
  date: Date;
  retirementTotal: number;
  expensesTotal: number;
  expensesObservations: string;
  postnetTotal: number;
  transfersTotal: number;
  cashTotalSystem: number;
  transfersTotalSystem: number;
  consumptions: Consumptions[];
  observations: string;
  photo: string;
  RegisterBarId: UUID;
  RegisterBar: RegisterBar;
  RegisterBarName: string;
  BranchName: string;
  BranchId: UUID;
  GroupName: string;
  CompanyName: string;
}
export interface RegisterTicketClosure extends Model {
  id: UUID;
  date: Date;
  retirementTotal: number;
  expensesTotal: number;
  expensesObservations: string;
  postnetTotal: number;
  transfersTotal: number;
  personsCantBar: number;
  personsCantBranch: number;
  soldTotal: number;
  tickets: Tickets[];
  totalEarnedAccount: number;
  earnedAccountBar: number;
  observations: string;
  photo: string;
  RegisterTicketId: UUID;
  RegisterTicket: RegisterTicket;
  RegisterTicketName: string;
  BranchId: UUID;
  BranchName: string;
  GroupName: string;
  CompanyName: string;
}

export interface RegisterCash extends Model {
  id: UUID;
  date: Date;
  type: RegisterTypeEnum;
  description: string;
  amount: number;
  revenue: number;
  expense: number;
  balance: number;
  BranchId: UUID;
  Branch: Branch;
  ConceptId: UUID;
  ConceptName: string;
  BranchName: string;
  GroupName: string;
  CompanyName: string;
}
export interface RegisterUSD extends Model {
  id: UUID;
  date: Date;
  type: RegisterTypeEnum;
  description: string;
  amount: number;
  revenue: number;
  expense: number;
  balance: number;
  BranchId: UUID;
  Branch: Branch;
  ConceptId: UUID;
  ConceptName: string;
  BranchName: string;
  GroupName: string;
  CompanyName: string;
}
export interface RegisterMP extends Model {
  id: UUID;
  date: Date;
  type: RegisterTypeEnum;
  description: string;
  amount: number;
  revenue: number;
  expense: number;
  balance: number;
  BranchId: UUID;
  Branch: Branch;
  ConceptId: UUID;
  ConceptName: string;
  BranchName: string;
  GroupName: string;
  CompanyName: string;
}

export interface RegisterBank extends Model {
  id: UUID;
  date: Date;
  type: RegisterTypeEnum;
  description: string;
  amount: number;
  revenue: number;
  expense: number;
  balance: number;
  BranchId: UUID;
  Branch: Branch;
  ConceptId: UUID;
  ConceptName: string;
  BranchName: string;
  GroupName: string;
  CompanyName: string;
}

export interface Expense extends Model {
  id: UUID;
  date: Date;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
  BranchId: UUID;
  Branch: Branch;
  createdAt: Date;
  updatedAt: Date;
  ConceptId: UUID;
  ConceptName: string;
  BranchName: string;
  GroupName: string;
  CompanyName: string;
}
export interface RetirementFinish extends Model {
  id: UUID;
  type: RetirementTypeEnum;
  date: Date;
  expenses: number;
  postnetBank: number;
  postnetMP: number;
  transfers: number;
  amount: number;
  BranchId: UUID;
  RegisterBarId: UUID;
  RegisterTicketId: UUID;
  RegisterName: string;
}
export interface Retirement extends Model {
  id: UUID;
  type: RetirementFinishTypeEnum;
  date: Date;
  amount: number;
  BranchId: UUID;
  RegisterBarId: UUID;
  RegisterTicketId: UUID;
  BranchName: string;
  RegisterName: string;
}

export interface Concept extends Model {
  id: UUID;
  name: string;
  level: number;
  type: string;
  visible: boolean;
  TypeId: UUID;
}

export interface FixedCostConcept extends Model {
  id: UUID;
  type: FixedCostTypeEnum;
  amount: number;
  comment: string;
  percentage: number;
}

export interface FlowContingency extends Model {
  id: UUID;
  date: Date;
  type: RegisterTypeEnum;
  description: string;
  amount: number;
  revenue: number;
  expense: number;
  balance: number;
  BranchId: UUID;
  Branch: Branch;
  ConceptId: UUID;
  ConceptName: string;
  BranchName: string;
  GroupName: string;
  CompanyName: string;
}
export interface FlowWorks extends Model {
  id: UUID;
  date: Date;
  type: RegisterTypeEnum;
  description: string;
  amount: number;
  revenue: number;
  expense: number;
  balance: number;
  BranchId: UUID;
  Branch: Branch;
  ConceptId: UUID;
  ConceptName: string;
  BranchName: string;
  GroupName: string;
  CompanyName: string;
}
export interface FlowFixedCost extends Model {
  id: UUID;
  date: Date;
  type: RegisterTypeEnum;
  description: string;
  amount: number;
  revenue: number;
  expense: number;
  balance: number;
  BranchId: UUID;
  Branch: Branch;
  ConceptId: UUID;
  ConceptName: string;
  BranchName: string;
  GroupName: string;
  CompanyName: string;
}

export interface PostnetBank extends Model {
  id: UUID;
  date: Date;
  debit: number;
  credit: number;
  qr: number;
  total: number;
  comment: string;
  BranchId: UUID;
  BranchName: string;
  GroupName: string;
  CompanyName: string;
  Branch: Branch;
}
export interface PostnetMP extends Model {
  id: UUID;
  date: Date;
  debit: number;
  credit: number;
  qr: number;
  comment: string;
  BranchId: UUID;
  Branch: Branch;
}
