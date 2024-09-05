import {
  ADMINS_ROL_DICTIONARY,
  MOVEMENT_TYPE_DICTIONARY,
  PAYMENT_METHOD_DICTIONARY,
  TREASURY_TYPE_DICTIONARY,
  USER_ROL_DICTIONARY,
} from "@/types/dictionaries";
import { EditIcon } from "@/ui/icons/edit";
import { Avatar } from "@nextui-org/avatar";
import Image from "next/image";

export default function processTableValue(
  columnId: any,
  row: any,
  identifier: string,
  value: any,
  onOpen?: any,
  onclick?: any
) {
  switch (columnId) {
    case "photo":
      const isUser = identifier === "user";
      return (
        <div className="flex justify-center">
          {isUser ? (
            <Avatar
              src={value}
              name={`${row.fullName.split(" ")[0][0]}${
                row.fullName.split(" ")[1][0]
              }`}></Avatar>
          ) : (
            <Image
              src={value}
              alt={`${row.id}_photo`}
              unoptimized
              width={35}
              height={35}
            />
          )}
        </div>
      );
    case "consumptions":
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            justifyContent: "center",
          }}>
          {value.map((consumption: any) => (
            <>
              {consumption.quantity} - {consumption.description}
              <br></br>
            </>
          ))}
        </div>
      );
    case "tickets":
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            justifyContent: "center",
          }}>
          {value &&
            value.map((consumption: any) => (
              <>
                {consumption.quantity} - {consumption.name}
                <br></br>
              </>
            ))}
        </div>
      );
    case "type":
      return (
        <>
          {["treasuryCentralFlow", "treasuryCentralRegister"].some((i) =>
            identifier.includes(i)
          ) ? (
            <div>{MOVEMENT_TYPE_DICTIONARY[value]}</div>
          ) : identifier === "concept" ? (
            <div>{value}</div>
          ) : (
            <div>{TREASURY_TYPE_DICTIONARY[value]}</div>
          )}
        </>
      );
    case "role":
      return (
        <>
          {identifier === "user" ? (
            <div>{USER_ROL_DICTIONARY[value]}</div>
          ) : (
            <div>{ADMINS_ROL_DICTIONARY[value]}</div>
          )}
        </>
      );
    case "payment_method":
      return <div>{PAYMENT_METHOD_DICTIONARY[value]}</div>;
    case "revenue":
      if (row.type === "revenue") {
        return <div>${row.amount}</div>;
      }
      return;
    case "expense":
      if (row.type === "expense") {
        return <div>${row.amount}</div>;
      }
      return;
    case "edit":
      return (
        <div
          className="flex gap-2 items-center justify-center"
          onClick={onclick}>
          <span
            onClick={onOpen}
            className="text-lg text-default-400 cursor-pointer active:opacity-50">
            <EditIcon />
          </span>
          {row.isEdited ? (
            <div
              style={{ backgroundColor: "#d7a453" }}
              className="flex w-3 h-3 bg-warning-500 rounded-full"></div>
          ) : null}
        </div>
      );
    case "date":
      const year = value.split("-")[0];
      const month = value.split("-")[1];
      const day = value.split("-")[2];
      return `${day}/${month}/${year}`;

    case "visible":
      return <div>{Boolean(value) ? "✅" : "❌"}</div>;
    case "retirementTotal":
    case "retirementFinish":
    case "expensesTotal":
    case "postnetTotal":
    case "transfersTotal":
    case "cashTotalSystem":
    case "transfersTotalSystem":
    case "soldTotal":
    case "amount":
    case "expenses":
    case "transfers":
    case "unitPrice":
    case "total":
    case "postnet":
    case "balanceCash":
    case "balanceBank":
    case "balanceTransfer":
    case "amountActual":
    case "amountTheoretical":
    case "retirementsTotal":
    case "retirementsFinishTotal":
    case "retirementsFinishExpensesTotal":
    case "treasuryExpensesTotal":
    case "expensesTotal":
    case "cashTotal":
    case "postnetTotal":
    case "transfersTotal":
    case "totalEarnedAccount":
    case "debit":
    case "credit":
    case "qr":
    case "difference":
      return `${value ? "$" + value.toLocaleString("es-AR") : "-"}`;
    default:
      return value;
      break;
  }
}
export function processTableMovementsValue(column: any, value: any, row: any) {
  switch (column) {
    case "":
      return (
        <div className="text-center items-center flex justify-center w-full group px-3 h-10 rtl:text-right align-middle bg-default-100 whitespace-nowrap text-foreground-500 text-tiny font-semibold first:rounded-l-lg rtl:first:rounded-r-lg rtl:first:rounded-l-[unset] last:rounded-r-lg rtl:last:rounded-l-lg rtl:last:rounded-r-[unset] data-[sortable=true]:transition-colors data-[sortable=true]:cursor-pointer data-[hover=true]:text-foreground-400 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2">
          {value}
        </div>
      );
    case "concept":
    case "earnedAccount":
    case "description":
    case "quantity":
      return <>{value}</>;
    default:
      if (row[""] == "Cuenta ganado") {
        return value;
      }
      return value ? `$${parseInt(value).toLocaleString("es-AR")}` : "0";
  }
}
