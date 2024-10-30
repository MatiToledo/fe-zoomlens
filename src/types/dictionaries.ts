import {
  fetchCreateFlowContingency,
  fetchDeleteFlowContingency,
  fetchEditFlowContingency,
} from "@/api/endpoints/treasury/central/flow/contingency";
import {
  fetchCreateFlowFixedCost,
  fetchDeleteFlowFixedCost,
  fetchEditFlowFixedCost,
} from "@/api/endpoints/treasury/central/flow/fixedCost";
import {
  fetchCreateFlowWorks,
  fetchDeleteFlowWorks,
  fetchEditFlowWorks,
} from "@/api/endpoints/treasury/central/flow/works";
import {
  fetchCreatePostnetBank,
  fetchDeletePostnetBank,
  fetchEditPostnetBank,
} from "@/api/endpoints/treasury/central/postnet/bank";
import {
  fetchCreatePostnetMP,
  fetchDeletePostnetMP,
  fetchEditPostnetMP,
} from "@/api/endpoints/treasury/central/postnet/mp";
import {
  fetchCreateRegisterBank,
  fetchDeleteRegisterBank,
  fetchEditRegisterBank,
} from "@/api/endpoints/treasury/central/register/bank";
import {
  fetchCreateRegisterCash,
  fetchDeleteRegisterCash,
  fetchEditRegisterCash,
} from "@/api/endpoints/treasury/central/register/cash";
import {
  fetchCreateRegisterMP,
  fetchDeleteRegisterMP,
  fetchEditRegisterMP,
} from "@/api/endpoints/treasury/central/register/mp";
import {
  fetchCreateRegisterUSD,
  fetchDeleteRegisterUSD,
  fetchEditRegisterUSD,
} from "@/api/endpoints/treasury/central/register/usd";

export const USER_ROL_DICTIONARY: Record<string, string> = {
  register: "Cajero",
  registerBarClosure: "Cajero Barra",
  registerTicketClosure: "Cajero Boleteria",
  treasury: "Tesorero",
  treasuryNight: "Tesorero Nocturno",
  treasuryCentral: "Tesorero Central",
  stockRegisterBar: "Stock Barra",
  stockCentral: "Stock Central",
};
export const ADMINS_ROL_DICTIONARY: Record<string, string> = {
  admin: "Administrador",
  partner: "Socio",
};

export const PAYMENT_METHOD_DICTIONARY: Record<string, string> = {
  cash: "Efectivo",
  bank: "Banco",
  transfer: "Transferencia",
  mp: "MP",
};
export const MOVEMENT_TYPE_DICTIONARY: Record<string, string> = {
  expense: "Egreso",
  revenue: "Ingreso",
};
export const TREASURY_TABLES_DICTIONARY: Record<string, string> = {
  principal: "Movimientos",
  registers: "Dinero en cajas",
  expenses: "Gastos",
  totalCash: "Efectivo a rendir",
  expensesDetails: "Detalles de gastos",
  expensesGrouped: "Gastos agrupados",
  resumen: "Resumen",
};
export const TREASURY_TYPE_DICTIONARY: Record<string, string> = {
  registerTicket: "Boleteria",
  registerBar: "Bar",
};

export const IDENTIFIERS_DICTIONARY: Record<string, string> = {
  branch: "Sucursales",
  group: "Grupos",
  company: "Compañias",
  user: "Usuarios",
  registerBarClosure: "Cierres de Caja",
  registerTicketClosure: "Cierres de Boleteria",
  registerBar: "Cajas",
  registerTicket: "Boleterias",
  treasuryNightRetirement: "Retiros",
  treasuryNightExpense: "Gastos",
  treasuryNightRetirementfinish: "Retiros Finales",
  treasuryCentralFlowContingency: "Flow de Contingencias",
  treasuryCentralFlowFixedcost: "Flow de Costos Fijos",
  treasuryCentralFlowWorks: "Flow de Obras",
  treasuryCentralRegisterCash: "Caja de Efectivo",
  treasuryCentralRegisterBank: "Caja de Banco",
  treasuryCentralRegisterMp: "Caja de Mercado Pago",
  treasuryCentralRegisterUsd: "Caja de Dolares",
  treasuryCentralPostnetBank: "Postnets de Banco",
  treasuryCentralPostnetMp: "Postnets de MP",
  concept: "Conceptos",
  admin: "Administradores",
  treasuryNightCashregister: "Cierres de Tesoreria",
  stockProduct: "Productos Stock Central",
  stockCentral: "Movimientos Stock Central",
  stockRegisterbar: "Stocks de Barra",
  stockRegisterbarclosure: "Cierres de Stock de Barra",
  stockRegisterbarclosureDetail: "Detalles de Stock de Cierre de Barra",
};

export const MONTHS_DICTIONARIES: Record<number, string> = {
  1: "Enero",
  2: "febrero",
  3: "Marzo",
  4: "Abril",
  5: "Mayo",
  6: "Junio",
  7: "Julio",
  8: "Agosto",
  9: "Septiembre",
  10: "Octubre",
  11: "Noviembre",
  12: "Diciembre",
};

export const FIXED_COST_TYPE_DICTIONARY: Record<string, string> = {
  property: "Propiedad",
  service: "Servicios",
  tax: "Impuestos",
  salary: "Salarios",
  other: "Otros",
  total: "Total",
};

export const TREASURY_MODAL_TITLE: Record<string, string> = {
  registerCash: "efectivo",
  registerBank: "banco",
  registerMp: "mercado Pago",
  registerUsd: "dolares",
  flowFixedcosts: "costos Fijos",
  flowWorks: "obras",
  flowContingency: "contingencia",
  postnetBank: "postnet de Banco",
  postnetMp: "postnet de MP",
};

export const TREASURY_CENTRAL_CREATE_FETCHERS: Record<string, any> = {
  registerCash: fetchCreateRegisterCash,
  registerBank: fetchCreateRegisterBank,
  registerMp: fetchCreateRegisterMP,
  registerUsd: fetchCreateRegisterUSD,
  flowFixedcosts: fetchCreateFlowFixedCost,
  flowWorks: fetchCreateFlowWorks,
  flowContingency: fetchCreateFlowContingency,
  postnetBank: fetchCreatePostnetBank,
  postnetMp: fetchCreatePostnetMP,
};
export const TREASURY_CENTRAL_EDIT_FETCHERS: Record<string, any> = {
  registerCash: fetchEditRegisterCash,
  registerBank: fetchEditRegisterBank,
  registerMp: fetchEditRegisterMP,
  registerUsd: fetchEditRegisterUSD,
  flowFixedcosts: fetchEditFlowFixedCost,
  flowWorks: fetchEditFlowWorks,
  flowContingency: fetchEditFlowContingency,
  postnetBank: fetchEditPostnetBank,
  postnetMp: fetchEditPostnetMP,
};
export const TREASURY_CENTRAL_DELETE_FETCHERS: Record<string, any> = {
  registerCash: fetchDeleteRegisterCash,
  registerBank: fetchDeleteRegisterBank,
  registerMp: fetchDeleteRegisterMP,
  registerUsd: fetchDeleteRegisterUSD,
  flowFixedcosts: fetchDeleteFlowFixedCost,
  flowWorks: fetchDeleteFlowWorks,
  flowContingency: fetchDeleteFlowContingency,
  postnetBank: fetchDeletePostnetBank,
  postnetMp: fetchDeletePostnetMP,
};
