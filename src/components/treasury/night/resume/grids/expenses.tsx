import { fetchBulkCreateExpense } from "@/api/endpoints/treasury/night/expense";
import { AddRows } from "@/components/treasury/central/grid";
import { TREASURY_TABLES_DICTIONARY } from "@/types/dictionaries";
import { Expense } from "@/types/models";
import { moneyColumn } from "@/ui/grid/money";
import { selectColumn } from "@/ui/grid/select";
import { SubmitIcon } from "@/ui/icons/submit";
import { Button } from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";
import {
  DataSheetGrid,
  intColumn,
  keyColumn,
  textColumn,
} from "react-datasheet-grid";

export default function GridExpenses({
  tableData,
  concepts,
  BranchId,
  mutate,
  date,
}: any) {
  console.log("concepts: ", concepts);
  const [data, setData] = useState<Expense[]>();
  const createdRowIds = useMemo(() => new Set(), []);
  const updatedRowIds = useMemo(() => new Set(), []);
  const columns: any = [
    {
      ...keyColumn(
        "ConceptId",
        selectColumn({
          choices: concepts as any,
        })
      ),
      title: "Concepto",
      grow: 1.5,
    },
    {
      ...keyColumn("description", textColumn),
      title: "Descripcion",
    },
    {
      ...keyColumn("quantity", intColumn),
      title: "Cantidad",
    },
    {
      ...keyColumn("unitPrice", moneyColumn),
      title: "Precio Unitario",
    },
    {
      ...keyColumn("total", moneyColumn),
      title: "Total",
      disabled: true,
    },
  ];

  useEffect(() => {
    setData(tableData);
  }, [tableData]);

  const commit = async () => {
    const dataToUpdate = data?.filter((m: any) => updatedRowIds.has(m.id));
    const dataToCreate = data
      ?.filter((m: any) => createdRowIds.has(m.id))
      .map((m: any) => ({ ...m, BranchId, date }));

    let items;
    if (dataToUpdate && dataToCreate) {
      items = dataToUpdate?.concat(dataToCreate);
    }

    await fetchBulkCreateExpense({
      items,
    });

    mutate();

    createdRowIds.clear();
    updatedRowIds.clear();
  };

  return (
    <div className="relative">
      {data && (
        <>
          <h2 className="w-full  text-lg lg:text-xl text-default-600 block text-center mb-5">
            {TREASURY_TABLES_DICTIONARY.expensesDetails}
          </h2>
          <DataSheetGrid
            aria-label={`Expenses Grid for ${BranchId}`}
            aria-labelledby={`Expenses Grid for ${BranchId}`}
            className="p-4 z-0 flex-col relative bg-content1 overflow-auto rounded-large shadow-small w-full flex justify-start"
            addRowsComponent={AddRows as any}
            disableContextMenu
            value={data}
            height={650}
            columns={columns}
            rowClassName={({ rowData }: any) => {
              if (createdRowIds.has(rowData.id)) {
                return "row-created";
              }
              if (updatedRowIds.has(rowData.id)) {
                return "row-updated";
              }
            }}
            onChange={(newValue, operations) => {
              for (const operation of operations) {
                if (operation.type === "CREATE") {
                  newValue
                    .slice(operation.fromRowIndex, operation.toRowIndex)
                    .forEach(({ id }: any) => createdRowIds.add(id));
                }

                if (operation.type === "UPDATE") {
                  newValue = newValue.map((row, index) => {
                    if (
                      index >= operation.fromRowIndex &&
                      index < operation.toRowIndex
                    ) {
                      const { id, quantity, unitPrice } = row;
                      const updatedTotal = quantity * unitPrice;
                      if (!createdRowIds.has(id)) {
                        updatedRowIds.add(id);
                      }
                      return { ...row, total: updatedTotal };
                    }
                    return row;
                  });
                }
              }

              setData(newValue as any);
            }}
          />
          <div className="absolute bottom-[16px] right-[106px] flex row justify-center align-middle">
            <Button
              className="bg-foreground text-background size-sm"
              startContent={<SubmitIcon />}
              onClick={commit}
              size="sm">
              Actualizar
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
