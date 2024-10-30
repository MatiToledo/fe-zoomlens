import { UseFormGetValues, UseFormWatch } from "react-hook-form";
import { useGetConceptsByLevel } from "../concept";
import { useGetAllCompanies } from "./company";
import { useGetAllGroupsByCompany } from "./group";
import { useGetAllBranchesByGroup } from "./branch";
import { Dispatch, SetStateAction, useEffect } from "react";
import { QueryTables } from "@/types";
import { usePathname } from "next/navigation";

export function usePathnameData() {
  const pathname = usePathname();
  const isTreasury = pathname.includes("treasury/central");
  const isTreasuryNight =
    pathname.includes("treasury/night") || pathname.includes("cashRegister");
  const isClosure = pathname.includes("closure");
  const isStock = pathname.includes("stock");
  const isManagement =
    !isTreasury && !isTreasuryNight && !isClosure && !isStock;

  const path = pathname.split("/").slice(2).join("/") || "";

  function convertToCamelCase(str: string) {
    return str
      .toLowerCase()
      .split("/")
      .map((word, index) => {
        if (index === 0) {
          return word;
        }
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join("");
  }

  const identifier = convertToCamelCase(path);

  return {
    pathname,
    identifier,
    isTreasury,
    isTreasuryNight,
    isClosure,
    isManagement,
  };
}

export function useFilters({
  watch,
  getValues,
  setQueries,
}: {
  watch: UseFormWatch<any>;
  getValues: UseFormGetValues<any>;
  setQueries: Dispatch<SetStateAction<QueryTables>>;
}) {
  const companies = useGetAllCompanies();
  const groups = useGetAllGroupsByCompany(watch("CompanyId"));
  const branches = useGetAllBranchesByGroup(watch("GroupId"));
  const concepts = useGetConceptsByLevel("1");

  const selectedFields = getValues();

  Object.values(getValues()).forEach((field: any) => {
    selectedFields[field] = watch(field) !== undefined;
  });
  useEffect(() => {
    setQueries((prev) => ({ ...prev, CompanyId: getValues("CompanyId") }));
  }, [watch("CompanyId")]);

  useEffect(() => {
    setQueries((prev) => ({ ...prev, GroupId: getValues("GroupId") }));
  }, [watch("GroupId")]);

  useEffect(() => {
    setQueries((prev) => ({ ...prev, BranchId: getValues("BranchId") }));
  }, [watch("BranchId")]);

  useEffect(() => {
    setQueries((prev) => ({ ...prev, role: getValues("role") }));
  }, [watch("role")]);
  useEffect(() => {
    setQueries((prev) => ({ ...prev, level: getValues("level") }));
  }, [watch("level")]);
  useEffect(() => {
    setQueries((prev) => ({ ...prev, year: getValues("year") }));
  }, [watch("year")]);
  useEffect(() => {
    setQueries((prev) => ({ ...prev, month: getValues("month") }));
  }, [watch("month")]);
  useEffect(() => {
    setQueries((prev) => ({ ...prev, week: getValues("week") }));
  }, [watch("week")]);

  return { companies, groups, branches, concepts, selectedFields };
}
