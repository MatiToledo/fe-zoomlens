import { Input } from "@nextui-org/react";
import { SearchIcon } from "../icons/search";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { QueryTables } from "@/types";

export default function ControlledSearch({
  queries,
  setQueries,
}: {
  queries: QueryTables;
  setQueries: Dispatch<SetStateAction<QueryTables>>;
}) {
  const [value, setValue] = useState(queries.q);

  useEffect(() => {
    if (queries.q === "") {
      setValue("");
    }
  }, [queries]);

  const handleOnKeyDown = (e: any) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      setQueries((prev) => ({ ...prev, q: e.target.value }));
    }
  };
  const handleOnChangeQuery = (e: any) => {
    setValue(e.target.value);
  };
  return (
    <Input
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      placeholder="Buscar"
      onChange={handleOnChangeQuery}
      onKeyDown={handleOnKeyDown}
      value={value}
      size="lg"
      fullWidth
      defaultValue={value}
      startContent={<SearchIcon className="text-default-300" />}
      type={"text"}
    />
  );
}
