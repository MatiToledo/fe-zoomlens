import { fetchUpdateFixedCost } from "@/api/endpoints/treasury/central/fixedCost";
import { SubmitIcon } from "@/ui/icons/submit";
import notify from "@/utils/notify";
import { Button } from "@nextui-org/react";
import { UUID } from "crypto";
import { useMemo, useState } from "react";
import { DataSheetGrid, intColumn, keyColumn } from "react-datasheet-grid";

export default function WeeksCalculations({
  weekendCount,
  weekendsData,
  FixedCostId,
  mutate,
  totalAmount,
}: {
  mutate: any;
  totalAmount: number;
  FixedCostId: UUID;
  weekendCount: number;
  weekendsData: any;
}) {
  const [data, setData] = useState<{ [key: string]: number }[]>(weekendsData);
  const updatedRowIds = useMemo(() => new Set(), []);
  const columns = [];

  for (let i = 0; i < weekendCount; i++) {
    columns.push({
      ...keyColumn(`weekend${i + 1}`, intColumn),
      title: `Semana ${i + 1}`,
      disabled: ({ rowIndex }: any) => rowIndex === 1,
    });
  }

  const commit = async () => {
    const dataToUpdate = data.filter((m: any) => updatedRowIds.has(m.id));
    const sum = Object.keys(dataToUpdate[0]).reduce(
      (acc: any, key: any) => acc + dataToUpdate[0][key],
      0
    );
    if (sum !== 100) {
      setData(weekendsData);
      notify("La suma de porcentajes debe ser 100%", "error");
      updatedRowIds.clear();
      return;
    }
    await fetchUpdateFixedCost(FixedCostId, dataToUpdate[0]);
    updatedRowIds.clear();
    mutate();
  };
  //TODO que la segunda fila este como plata
  return (
    <div className="w-full relative">
      {columns.length > 0 && (
        <DataSheetGrid
          aria-label={`Weekend Calculations for ${FixedCostId}`}
          aria-labelledby={`Weekend Calculations for ${FixedCostId}`}
          className="p-4 z-0 flex-col relative bg-content1 overflow-auto rounded-large shadow-small w-full flex justify-start min-h-[212px]"
          addRowsComponent={false}
          disableContextMenu
          value={data}
          height={650}
          columns={columns}
          rowClassName={({ rowIndex }: any) => {
            if (rowIndex === 0) {
              return "row-percentage";
            }
          }}
          onChange={(newValue, operations) => {
            for (const operation of operations) {
              if (operation.type === "UPDATE") {
                newValue
                  .slice(operation.fromRowIndex, operation.toRowIndex)
                  .forEach(({ id }: any) => {
                    updatedRowIds.add(id);
                  });
              }
            }
            const updatedData = [{ ...newValue[0] }, {}];
            for (let i = 0; i < weekendCount; i++) {
              updatedData[1][`weekend${i + 1}`] =
                totalAmount * (updatedData[0][`weekend${i + 1}`] / 100);
            }

            setData(updatedData);
          }}
        />
      )}
      <div className="absolute bottom-[16px] right-[16px] flex row justify-center align-middle ">
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
