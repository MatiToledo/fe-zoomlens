import { fetchBulkCreateTreasuryNight } from "@/api/endpoints/treasury/night";
import { TREASURY_TABLES_DICTIONARY } from "@/types/dictionaries";
import { moneyColumn } from "@/ui/grid/money";
import { SubmitIcon } from "@/ui/icons/submit";
import { Button } from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";
import { DataSheetGrid, keyColumn, textColumn } from "react-datasheet-grid";

export default function GridResume({ tableData, BranchId, mutate, date }: any) {
  const [data, setData] = useState<any>();

  const updatedRows = useMemo(() => new Set(), []);
  const columns: any = [
    { ...keyColumn("label", textColumn), title: "", disabled: true },
  ];

  useEffect(() => {
    setData(tableData.rows);
  }, [tableData]);

  const disabledLabels = [
    "Total efectivo",
    "Suma Retiros",
    "Facturación total",
  ];

  tableData.columns.forEach((c: any) => {
    columns.push({
      ...keyColumn(c.name, moneyColumn),
      title: c.name,
      disabled: ({ rowData }: any) => disabledLabels.includes(rowData.label),
    });
  });

  const commit = async () => {
    const items = Array.from(updatedRows).map((item: any) => ({
      ...item,
      BranchId,
    }));
    await fetchBulkCreateTreasuryNight(
      {
        items,
      },
      date
    );

    mutate();

    updatedRows.clear();
  };

  function handleUpdateRetirement(row: any, key: string, value: any) {
    if (key !== "label" && typeof value === "string") {
      const existingUpdate: any = Array.from(updatedRows).find(
        (item: any) =>
          item.id === row.data[key].RetirementId &&
          item.RegisterId === row.data[key].RegisterId
      );
      if (existingUpdate) {
        existingUpdate.amount = Number(value);
      } else {
        const toUpdate = {
          id: row.data[key].RetirementId,
          RegisterId: row.data[key].RegisterId,
          amount: Number(value),
          type: row.data[key].type,
          model: "Retirement",
        };
        updatedRows.add(toUpdate);
      }
    }
  }

  function handleUpdateRetirementFinish(row: any, key: string, value: any) {
    if (key !== "label" && typeof value === "string") {
      const existingUpdate: any = Array.from(updatedRows).find(
        (item: any) =>
          item.id === row.data[key].RetirementFinishId &&
          item.RegisterId === row.data[key].RegisterId &&
          item.model === "RetirementFinish"
      );
      if (existingUpdate) {
        if (row.label === "Postnet") {
          existingUpdate.postnet = Number(value);
        } else if (row.label === "Transferencias") {
          existingUpdate.postnet = Number(value);
        } else if (row.label.startsWith("Gastos")) {
          existingUpdate.expenses = Number(value);
        } else {
          existingUpdate.amount = Number(value);
        }
      } else {
        const toUpdate: any = {
          id: row.data[key].RetirementFinishId,
          RegisterId: row.data[key].RegisterId,
          type: row.data[key].type,
          model: "RetirementFinish",
        };
        if (row.label === "Postnet") {
          toUpdate.postnet = Number(value);
        } else if (row.label === "Transferencias") {
          toUpdate.postnet = Number(value);
        } else if (row.label.startsWith("Gastos")) {
          toUpdate.expenses = Number(value);
        } else {
          toUpdate.amount = Number(value);
        }
        updatedRows.add(toUpdate);
      }
    }
  }

  return (
    <div className="relative">
      {data && (
        <>
          <h2 className="w-full  text-lg lg:text-xl text-default-600 block text-center mb-5">
            {TREASURY_TABLES_DICTIONARY.resumen}
          </h2>
          <DataSheetGrid
            aria-label={`Resumen Grid for ${BranchId}`}
            aria-labelledby={`Resumen Grid for ${BranchId}`}
            className="p-4 pb-[55px] z-0 flex-col relative bg-content1 overflow-auto rounded-large shadow-small w-full flex justify-start"
            addRowsComponent={false}
            disableContextMenu
            value={data}
            height={650}
            columns={columns}
            onChange={(newValue, operations) => {
              for (const operation of operations) {
                if (operation.type === "UPDATE") {
                  const rowModified: any = newValue[operation.fromRowIndex];

                  Object.entries(rowModified).forEach(([key, value]) => {
                    if (rowModified.label.startsWith("Retiro n°")) {
                      handleUpdateRetirement(rowModified, key, value);
                    } else {
                      handleUpdateRetirementFinish(rowModified, key, value);
                    }
                  });
                }
              }

              setData(newValue as any);
            }}
          />
          <div className="absolute bottom-[16px] right-[16px] flex row justify-center align-middle">
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
