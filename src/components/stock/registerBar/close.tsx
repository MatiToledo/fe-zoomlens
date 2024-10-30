"use client";
import { fetchCreateStockRegisterBarClosure } from "@/api/endpoints/stock/registerBarClosure";
import { useAllStockRegisterBarByRegisterId } from "@/hooks/stock/registerBar";
import { generateStockPDF } from "@/utils/generatePDF";
import notify from "@/utils/notify";
import { parseDate } from "@internationalized/date";
import {
  Button,
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Textarea,
} from "@nextui-org/react";
import { UUID } from "crypto";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import {
  DataSheetGrid,
  floatColumn,
  keyColumn,
  textColumn,
} from "react-datasheet-grid";
import ReactDOM from "react-dom";
export default function StockRegisterBarClosureComponent() {
  const tablesRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const { push } = useRouter();
  const [observation, setObservation] = useState("");
  const searchParams = useSearchParams();
  const RegisterBarId = searchParams.get("RegisterBarId") as UUID;
  const date = parseDate(searchParams.get("date") as string);
  const { stockRegisterBar, setStockRegisterBar, mutate } =
    useAllStockRegisterBarByRegisterId(RegisterBarId, date);
  const createdRowIds = useMemo(() => new Set(), []);
  const updatedRowIds = useMemo(() => new Set(), []);
  const columns = [
    { ...keyColumn("ProductName", textColumn), title: "Nombre" },

    { ...keyColumn("final", floatColumn), title: "Final" },
  ];

  function downloadPDF() {
    setIsMounted(true);
    generateStockPDF(
      tablesRef,
      setIsMounted,
      `Cierre_Stock_{${`${stockRegisterBar[0].date}`}`
    );
  }

  async function onSubmit(data: any) {
    const StockRegisterBars = stockRegisterBar.map((stock) => {
      return {
        id: stock.id,
        entries: stock.entries,
        exits: stock.exits,
        final: stock.final,
        ProductPrice: stock.ProductPrice,
        consumed: stock.initial + stock.entries - stock.exits - stock.final,
      };
    });
    const body = {
      StockRegisterBarClosure: {
        observation,
        date: stockRegisterBar[0].date,
      },
      StockRegisterBars,
    };
    const failedConsumptions = StockRegisterBars.filter(
      (stock) => stock.consumed < 0
    );
    if (failedConsumptions.length > 0 && data.observation === "") {
      const productIds = failedConsumptions.map((stock) => stock.id);
      const productsNames = stockRegisterBar
        .filter((stock) => productIds.includes(stock.id))
        .map((stock) => stock.ProductName);

      notify(
        `El consumo de los productos no puede ser menor a 0 para los siguientes productos: ${productsNames.join(
          ", "
        )}`,
        "error"
      );
      return;
    }

    await fetchCreateStockRegisterBarClosure(body);
    setObservation(data.observation);
    await mutate();
    downloadPDF();
    push("/");
    notify(`Cierre de stock central creado con exito`, "success");
  }

  return (
    <>
      {stockRegisterBar.length > 0 && (
        <div className="bg-default-300 grow overflow-x-hidden w-full p-5 text-center relative max-w-[800px] m-auto">
          <div className="flex justify-center">
            <h1 className="text-4xl font-bold tracking-tight mb-4 max-w-[250px] md:max-w-[500px]">
              Cierre de Stock - {` ${stockRegisterBar[0].RegisterBarName}`}
            </h1>
          </div>

          <div className="relative mt-5">
            <DataSheetGrid
              className={`p-4 z-0 flex-col relative bg-content1 overflow-auto rounded-large shadow-small w-full flex justify-start `}
              addRowsComponent={false}
              disableContextMenu
              value={stockRegisterBar}
              height={650}
              columns={columns}
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

                setStockRegisterBar(newValue as any);
              }}
            />
          </div>
          <Textarea
            aria-label="Search"
            classNames={{
              inputWrapper: "bg-default-100 mt-5",
              input: "text-sm",
            }}
            onValueChange={setObservation}
            value={observation}
            validate={undefined}
            labelPlacement="inside"
            label={"Observacion"}
          />
          <Button color="primary" className="mt-5 w-full" onClick={onSubmit}>
            Cerrar stock
          </Button>
        </div>
      )}
      {isMounted &&
        stockRegisterBar &&
        ReactDOM.createPortal(
          <div
            ref={tablesRef}
            className={`flex flex-col gap-6  justify-center bg-default-300 px-5 py-5 items-center absolute top-[-10000000000px]  text-center`}>
            <div className="flex flex-col gap-3 z-10">
              <Image
                className="rounded-none"
                src="/logo.png"
                alt="logo"
                width={270}
                height={165}
              />
              <h2 className="ml-5">
                Cierre de stock - {` ${stockRegisterBar[0].RegisterBarName}`}
                {` ${parseDate(stockRegisterBar[0].date as any).day}-${
                  parseDate(stockRegisterBar[0].date as any).month
                }-${parseDate(stockRegisterBar[0].date as any).year}
               `}
              </h2>
            </div>
            <Table
              aria-label="Initial Stock"
              classNames={{
                wrapper: "flex justify-start",
                tr: "text-center",
                td: "text-center",
                th: "text-center",
              }}>
              <TableHeader
                columns={[
                  { key: "ProductName", label: "Producto" },
                  { key: "initial", label: "Inicial" },
                  { key: "entries", label: "Entradas" },
                  { key: "exits", label: "Salidas" },
                  { key: "final", label: "Final" },
                  { key: "consumed", label: "Consumo" },
                  { key: "ConsumedValue", label: "Valor Consumo" },
                ]}>
                {(column: any) => {
                  return (
                    <TableColumn key={column.key}>{column.label}</TableColumn>
                  );
                }}
              </TableHeader>
              <TableBody>
                {stockRegisterBar.map((row: any) => (
                  <TableRow key={row.id}>
                    {(columnKey) => (
                      <TableCell>{getKeyValue(row, columnKey)}</TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {observation && <p>Observacion: {observation}</p>}
          </div>,
          document.body
        )}
    </>
  );
}
