import {
  MOVEMENT_TYPE_DICTIONARY,
  PAYMENT_METHOD_DICTIONARY,
  TREASURY_TYPE_DICTIONARY,
  USER_ROL_DICTIONARY,
} from "@/types/dictionaries";
import {
  Branch,
  CashRegister,
  Company,
  Concept,
  Expense,
  Group,
  RegisterBar,
  RegisterBarClosure,
  RegisterTicket,
  RegisterTicketClosure,
  Retirement,
  RetirementFinish,
  User,
  UserBO,
} from "@/types/models";
import dayjs from "dayjs";
import * as XLSX from "xlsx";

export const downloadCSV = (data: any, type: string) => {
  const translatedData = translateData(data, type);
  const worksheet = XLSX.utils.json_to_sheet(translatedData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  const filename = `${type}-${dayjs().format("DD-MM-YYYY")}.xlsx`;

  // Obtener el archivo binario del libro de trabajo
  const wbBinary = XLSX.write(workbook, { bookType: "xlsx", type: "binary" });

  // Convertir el archivo binario a Blob
  const wbBlob = new Blob([s2ab(wbBinary)], {
    type: "application/octet-stream",
  });

  // Crear un enlace para descargar el archivo
  const link = document.createElement("a");
  link.href = URL.createObjectURL(wbBlob);
  link.download = filename;

  // Agregar el enlace al documento y hacer clic en él
  document.body.appendChild(link);
  link.click();

  // Limpiar el enlace del documento
  document.body.removeChild(link);
};
function s2ab(s: string): Uint8Array {
  const buf = new ArrayBuffer(s.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
  return view;
}

function translateData(data: any, type: string) {
  switch (type) {
    case "Cierre_de_Caja": {
      return data.map((row: RegisterBarClosure) => {
        let prettyConsumption = "";
        for (const consumptions of row.consumptions) {
          prettyConsumption += `${consumptions.quantity}: ${consumptions.description} \n`;
        }
        return {
          Fecha: row.date,
          "Total Retiro": row.retirementTotal,
          "Total Gastos": row.expensesTotal,
          "Observaciones gastos": row.expensesObservations,
          "Total postnet": row.postnetTotal,
          "Total Transferencias": row.transfersTotal,
          "Total Efectivo sistema": row.cashTotalSystem,
          "Total Postnet/Transf sistema": row.transfersTotalSystem,
          Consumiciones: prettyConsumption,
          Observaciones: row.observations,
          Foto: row.photo,
          Barra: row.RegisterBarName,
          Editado: row.isEdited ? "Si" : "No",
        };
      });
    }
    case "Cierre_de_Boleteria": {
      return data.map((row: RegisterTicketClosure) => {
        let prettyTickets = "";
        for (const ticket of row.tickets) {
          prettyTickets += `${ticket.quantity}: ${ticket.name} \n`;
        }
        return {
          Fecha: row.date,
          "Total Retiro": row.retirementTotal,
          "Total Gastos": row.expensesTotal,
          "Observaciones gastos": row.expensesObservations,
          "Total postnet": row.postnetTotal,
          "Total Transferencias": row.transfersTotal,
          "Total Vendido": row.soldTotal,
          Tickets: prettyTickets,
          "Cuenta ganado total": row.totalEarnedAccount,
          "Cuenta ganado cierre bar": row.earnedAccountBar,
          Observaciones: row.observations,
          Foto: row.photo,
          Boleteria: row.RegisterTicketName,
          Editado: row.isEdited ? "Si" : "No",
        };
      });
    }
    case "Retiro_Nocturno": {
      return data.map((row: Retirement) => {
        return {
          Fecha: row.date,
          Tipo: TREASURY_TYPE_DICTIONARY[row.type],
          Monto: row.amount,
          Caja: row.RegisterName,
          Editado: row.isEdited ? "Si" : "No",
        };
      });
    }
    case "Retiro_Finales_Nocturno": {
      return data.map((row: RetirementFinish) => {
        return {
          Fecha: row.date,
          Tipo: TREASURY_TYPE_DICTIONARY[row.type],
          Gastos: row.expenses,
          "Postnet Banco": row.postnetBank,
          "Postnet MP": row.postnetMP,
          Transferencias: row.transfers,
          Monto: row.amount,
          Caja: row.RegisterName,
          Editado: row.isEdited ? "Si" : "No",
        };
      });
    }
    case "Gastos_Nocturno": {
      return data.map((row: Expense) => {
        return {
          Fecha: row.date,
          Descripcion: row.description,
          Cantidad: row.quantity,
          Precio: row.unitPrice,
          Total: row.total,
          Concepto: row.CompanyName,
          Compania: row.CompanyName,
          Grupo: row.GroupName,
          Sucursal: row.BranchName,
          Editado: row.isEdited ? "Si" : "No",
        };
      });
    }
    // case "Movimientos_Tesoreria": {
    //   return data.map((row: TreasuryCe) => {
    //     return {
    //       Fecha: row.date,
    //       Tipo: MOVEMENT_TYPE_DICTIONARY[row.type],
    //       "Metodo de pago": PAYMENT_METHOD_DICTIONARY[row.payment_method],
    //       Descripcion: row.description,
    //       Monto: row.amount,
    //       Concepto: row.concept,
    //       Compania: row.company,
    //       Grupo: row.group,
    //       Sucursal: row.branch,
    //       "Saldo Efectivo": row.balanceCash,
    //       "Saldo Banco": row.balanceBank,
    //       "Saldo Transferencia": row.balanceTransfer,
    //       Editado: row.isEdited ? "Si" : "No",
    //     };
    //   });
    // }
    case "Cierres_Tesoreria": {
      return data.map((row: CashRegister) => {
        return {
          Fecha: row.date,
          Compania: row.CompanyName,
          Grupo: row.GroupName,
          Sucursal: row.BranchName,
          Comentarios: row.comment,
          Monto: row.amountActual,
          "Monto Teórico": row.amountTheoretical,
          Retiros: row.retirementsTotal,
          "Retiros Finales": row.retirementsFinishTotal,
          "Gastos Retiros Finales": row.retirementsFinishExpensesTotal,
          "Gastos Tesoreria": row.treasuryExpensesTotal,
          Gastos: row.expensesTotal,
          "Postnet Total": row.postnetTotal,
          "Trasnferencias Total": row.transfersTotal,
          "Efectivo Total": row.cashTotal,
          Diferencia: row.difference,
        };
      });
    }
    case "Usuarios": {
      return data.map((row: User) => ({
        Nombre: row.fullName,
        Email: row.email,
        DNI: row.dni,
        Cargo: USER_ROL_DICTIONARY[row.role],
        Foto: row.photo,
        Telefono: row.phone, // Cambiar el nombre de 'phone' a 'telefono'
        Sucursal: row.BranchName, // Cambiar el nombre de 'branch' a 'sucursal'
        Grupo: row.GroupName,
        Compañia: row.CompanyName,
      }));
    }
    case "Administradores": {
      return data.map((row: UserBO) => ({
        Nombre: row.fullName,
        Email: row.email,
        Cargo: "Administrador",
      }));
    }
    case "Compañias": {
      return data.map((row: Company) => ({
        Nombre: row.name,
        "Cantidad Grupos": row.groupsCant,
        "Cantidad Sucursales": row.branchesCant,
      }));
    }
    case "Grupos": {
      return data.map((row: Group) => ({
        Nombre: row.name,
        Compañia: row.CompanyName,
        "Cantidad Sucursales": row.branchesCant,
      }));
    }
    case "Sucursales": {
      return data.map((row: Branch) => ({
        Nombre: row.name,
        Compañia: row.CompanyName,
        Grupo: row.GroupName,
        "Cantidad Barras": row.barsCant,
        "Cantidad Boleterias": row.ticketsCant,
      }));
    }
    case "Cajas": {
      return data.map((row: RegisterBar) => ({
        Nombre: row.name,
        Compañia: row.CompanyName,
        Grupo: row.GroupName,
        Sucursal: row.BranchName,
      }));
    }
    case "Boleterias": {
      return data.map((row: RegisterTicket) => ({
        Nombre: row.name,
        Compañia: row.CompanyName,
        Grupo: row.GroupName,
        Sucursal: row.BranchName,
      }));
    }
    case "Conceptos": {
      return data.map((row: Concept) => ({
        Nombre: row.name,
        Tipo: row.type,
        Nivel: row.level,
        Visible: row.visible ? "Si" : "No",
      }));
    }
  }
}
