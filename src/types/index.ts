import { CalendarDate } from "@nextui-org/react";
import { UUID } from "crypto";
import { SVGProps } from "react";
import { KeyedMutator } from "swr";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type FormProps = {
  BranchId: UUID;
  isModal?: boolean;
  mutate?: KeyedMutator<any>;
  isOpen?: boolean;
  onClose?: () => void;
  isEdit?: boolean;
};

export type MethodType = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
export interface QueryTables {
  page: number;
  limit: string;
  q?: string;
  CompanyId?: string;
  ConceptId?: string;
  GroupId?: string;
  BranchId?: string;
  level?: string;
  role?: string;
  date?: string;
  visible?: string;
}
export interface QueryMovements {
  BranchId?: string;
  date?: string;
}
export interface SelectOption {
  value: string;
  label: string;
}

export type InputProps = {
  startContent?: JSX.Element;
  endContent?: JSX.Element;
  placeholder?: string;
  type?: string;
  control: any;
  name: string;
  rules?: any;
  label?: string;
  options?: any;
  error?: any;
  size?: "sm" | "md" | "lg";
};
