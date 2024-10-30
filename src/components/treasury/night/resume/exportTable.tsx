import TableComponent from "@/components/table";
import { ExportIcon } from "@/ui/icons/export";
import { generatePDF } from "@/utils/generatePDF";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { useRef, useState } from "react";
import ReactDOM from "react-dom";

export default function ExportTable({ date, data }: any) {
  const tablesRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  async function downloadPDF() {
    setIsMounted(true);
    generatePDF(
      tablesRef,
      setIsMounted,
      `Impresión_parcial_${`${date.day}-${date.month}-${date.year}`}`
    );
  }

  return (
    <>
      <Button
        onClick={() => downloadPDF()}
        isIconOnly
        className="bg-foreground text-background"
        endContent={<ExportIcon size={17} />}></Button>
      {isMounted &&
        data &&
        ReactDOM.createPortal(
          <div
            ref={tablesRef}
            className="flex flex-col gap-6 flex-wrap justify-center bg-default-300 px-5 py-5 items-center w-[800px] absolute top-[-10000000000px]">
            <div className="flex flex-col gap-3 z-10">
              <Image
                className="rounded-none"
                src="/logo.png"
                alt="logo"
                width={270}
                height={165}
              />
              <h2 className="ml-5">
                Impresión parcial {`${date.day}/${date.month}/${date.year}`}
              </h2>
            </div>
            {Object.keys(data).map((table: any) => (
              <TableComponent
                key={table}
                table={table}
                data={data[table]}></TableComponent>
            ))}
          </div>,
          document.body
        )}
    </>
  );
}
