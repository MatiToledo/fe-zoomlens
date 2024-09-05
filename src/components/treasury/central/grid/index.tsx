import { SubmitIcon } from "@/ui/icons/submit";
import { Button } from "@nextui-org/react";
import { UUID } from "crypto";
import { Dispatch, SetStateAction, useMemo } from "react";
import { DataSheetGrid } from "react-datasheet-grid";
import { createAddRowsComponent } from "react-datasheet-grid/dist/components/AddRows";
import { KeyedMutator } from "swr";

export const AddRows = createAddRowsComponent({
  button: "Nuevo", // Add
  unit: "", // rows
});

export default function GridComponent({
  data,
  setData,
  columns,
  BranchId,
  fetcher,
  mutate,
}: {
  data: any;
  setData: Dispatch<SetStateAction<any[]>>;
  columns: any;
  BranchId: UUID;
  fetcher: any;
  mutate: KeyedMutator<any>;
}) {
  const createdRowIds = useMemo(() => new Set(), []);
  const updatedRowIds = useMemo(() => new Set(), []);

  const commit = async () => {
    const dataToUpdate = data.filter((m: any) => updatedRowIds.has(m.id));
    const dataToCreate = data
      .filter((m: any) => createdRowIds.has(m.id))
      .map((m: any) => ({ ...m, BranchId }));

    const items = dataToUpdate.concat(dataToCreate);
    await fetcher({
      items,
    });

    mutate();

    createdRowIds.clear();
    updatedRowIds.clear();
  };
  return (
    <div className="relative">
      <DataSheetGrid
        aria-label={`Grid for ${BranchId} `}
        aria-labelledby={`Grid for ${BranchId} `}
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
              newValue
                .slice(operation.fromRowIndex, operation.toRowIndex)
                .forEach(({ id }: any) => {
                  if (!createdRowIds.has(id)) {
                    updatedRowIds.add(id);
                  }
                });
            }
          }

          setData(newValue as any);
        }}
      />
      <div className="absolute bottom-[16px] right-[108px] flex row justify-center align-middle">
        <Button
          className="bg-foreground text-background size-sm"
          startContent={<SubmitIcon />}
          onClick={commit}
          size="sm">
          Actualizar
        </Button>
      </div>
    </div>
  );
}
