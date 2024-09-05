import { QueryTables } from "@/types";
import { Select, SelectItem } from "@nextui-org/react";
import { Dispatch, SetStateAction, useState } from "react";

export default function ControlledPagination({
  queries,
  setQueries,
}: {
  queries: QueryTables;
  setQueries: Dispatch<SetStateAction<QueryTables>>;
}) {
  const [value, setValue] = useState<string>(queries.limit);
  const options = [
    { value: "10", label: "10" },
    { value: "25", label: "25" },
    { value: "50", label: "50" },
    { value: "", label: "Todas" },
  ];

  const handleSelectionChange = (e: any) => {
    setValue(e.target.value);
    setQueries((prev) => ({ ...prev, limit: e.target.value }));
  };
  return (
    <Select
      label="Filas por página"
      selectedKeys={[value]}
      onChange={handleSelectionChange}
      fullWidth>
      {options.map((option: any) => (
        <SelectItem key={option.value} value={option.value}>
          {option.label}
        </SelectItem>
      ))}
    </Select>
  );
}
