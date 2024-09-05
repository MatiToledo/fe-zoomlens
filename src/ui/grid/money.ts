import { createTextColumn } from "react-datasheet-grid";

export const moneyColumn = createTextColumn({
  alignRight: true,
  formatBlurredInput: (value: string) =>
    `${value ? `$${parseFloat(value).toLocaleString("es-AR")}` : "-"}`,
  formatInputOnFocus: (value: string) =>
    `${value ? `$${parseFloat(value).toLocaleString("es-AR")}` : "-"}`,
});
