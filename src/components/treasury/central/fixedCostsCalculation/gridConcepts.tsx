import { fetchBulkCreateFixedCostConcept } from "@/api/endpoints/treasury/central/fixedCost/concept";
import { SubmitIcon } from "@/ui/icons/submit";
import { Button } from "@nextui-org/react";
import { useMemo, useState } from "react";
import {
  checkboxColumn,
  createTextColumn,
  DataSheetGrid,
  keyColumn,
  percentColumn,
  textColumn,
} from "react-datasheet-grid";
import { AddRows } from "../grid";
import { selectColumn } from "@/ui/grid/select";

export default function GridConcepts({
  concepts,
  mutate,
  FixedCostId,
  totalAmount,
}: any) {
  const [data, setData] = useState<any[]>(concepts);

  const createdRowIds = useMemo(() => new Set(), []);
  const updatedRowIds = useMemo(() => new Set(), []);
  const columns = [
    {
      ...keyColumn(
        "type",
        selectColumn({
          choices: [
            { value: "property", label: "Propiedad" },
            { value: "service", label: "Servicios" },
            { value: "tax", label: "Impuestos" },
            { value: "salary", label: "Sueldos" },
            { value: "other", label: "Otros" },
          ],
        })
      ),
      title: "Tipo",
      grow: 1.5,
      minWidth: 150,
    },
    {
      ...keyColumn("description", textColumn),
      title: "Descripcion",
    },
    {
      ...keyColumn(
        "amount",
        createTextColumn({
          alignRight: true,
          formatBlurredInput: (value: string) =>
            `$${parseFloat(value).toLocaleString("es-AR")}`,
          formatInputOnFocus: (value: string) =>
            `$${parseFloat(value).toLocaleString("es-AR")}`,
        })
      ),
      title: "Monto",
    },
    { ...keyColumn("comment", textColumn), title: "Comentarios" },
    { ...keyColumn("isPaid", checkboxColumn), title: "Pagado" },
    {
      ...keyColumn("percentage", percentColumn),
      title: "Porcentaje",
      disabled: true,
    },
  ];

  const commit = async () => {
    const dataToUpdate = data.filter((m: any) => updatedRowIds.has(m.id));
    const dataToCreate = data
      .filter((m: any) => createdRowIds.has(m.id))
      .map((m: any) => ({
        ...m,
        FixedCostId,
      }));

    const items = dataToUpdate.concat(dataToCreate);
    if (items.length > 0) {
      await fetchBulkCreateFixedCostConcept({ items });
      mutate();
    }
    createdRowIds.clear();
    updatedRowIds.clear();
  };

  //TODO El porcentaje no se actualiza en el mutate
  return (
    <div className="w-full relative">
      <DataSheetGrid
        aria-label={`grid_fixedCostsConcepts${concepts.length}`}
        aria-labelledby={`grid_fixedCostsConcepts${concepts.length}`}
        className="p-4 z-0 flex-col relative bg-content1 overflow-auto rounded-large shadow-small w-full flex justify-start"
        addRowsComponent={AddRows as any}
        disableContextMenu
        value={data}
        height={570}
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
      <div className="absolute bottom-[16px] left-[16px] flex row justify-center align-middle">
        <p>Total: ${totalAmount.toLocaleString("es-AR")}</p>
      </div>
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
