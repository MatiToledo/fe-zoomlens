import ReactDOM from "react-dom";
import TableComponent from "@/components/table";
import { generatePDF } from "@/utils/generatePDF";
import { useEffect, useRef, useState } from "react";

type PropsType = {
  result: any;
  tables: any;
  CompanyName: string;
  BranchName: string;
  date: any;
};

export default function CashRegisterPDF({
  result,
  tables,
  CompanyName,
  BranchName,
  date,
}: PropsType) {
  const tablesRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  function reshapePrincipalTable() {
    const columns = tables.principalTable.columns.map((column: any) => {
      return {
        key: column.name,
        label: column.name,
      };
    });
    columns.unshift({ key: "", label: "" });
    const rows = tables.principalTable.rows.map((row: any) => {
      delete row.data;
      return {
        ...row,
        "": row.label,
      };
    });

    return {
      columns,
      rows,
    };
  }

  const data = {
    resume: result.tableData,
    principalTable: reshapePrincipalTable(),
    cashTotalTable: tables.cashTotalTable,
    registersCashTable: tables.registersCashTable,
    expensesTable: tables.expensesTable,
    expensesDetailsTable: tables.expensesDetailsTable,
    groupedExpensesTable: tables.groupedExpensesTable,
  };
  const minWidth = data.principalTable.columns.length * 150;

  useEffect(() => {
    generatePDF(
      tablesRef,
      setIsMounted,
      `Cierre_${`${date.day}-${date.month}-${date.year}`}_${CompanyName}_${BranchName}`
    );
  }, []);
  return (
    <>
      {isMounted &&
        ReactDOM.createPortal(
          <div
            ref={tablesRef}
            className={`flex flex-col gap-6  justify-center bg-default-300 px-5 py-5 items-center min-w-[900px] max-w-[${minWidth.toString()}px] absolute top-[-10000000000px]  text-center`}>
            <div className="flex flex-col gap-3 z-10">
              <img
                src="/logo.png"
                alt="logo"
                style={{ width: "240px", height: "145px" }}
              />
              <h2>
                {CompanyName} - {BranchName}
              </h2>
              <h2>Cierre del dia {`${date.day}-${date.month}-${date.year}`}</h2>
            </div>
            <div
              key={`resume_table`}
              className="flex flex-col justify-center items-center gap-3 w-full">
              <div className="w-[600px]">
                <TableComponent
                  table={"resumen"}
                  data={data.resume}></TableComponent>
              </div>
              <TableComponent
                table={"principal"}
                data={data.principalTable}></TableComponent>
              <TableComponent
                table={"expensesGrouped"}
                data={data.groupedExpensesTable}
              />
              <TableComponent table={"expenses"} data={data.expensesTable} />
              <TableComponent
                table={"registers"}
                data={data.registersCashTable}
              />
              <TableComponent table={"totalCash"} data={data.cashTotalTable} />
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
