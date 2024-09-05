import Select, { GroupBase, SelectInstance } from "react-select";
import React, { useLayoutEffect, useRef } from "react";
import { CellProps, Column } from "react-datasheet-grid";

type Choice = {
  label: string;
  value: string;
};

type SelectOptions = {
  choices: Choice[];
  disabled?: boolean;
};

export const SelectComponent = React.memo(
  ({
    active,
    rowData,
    setRowData,
    focus,
    stopEditing,
    columnData,
  }: CellProps<string | null, SelectOptions>) => {
    const ref = useRef<SelectInstance<Choice, false, GroupBase<Choice>>>(null);

    useLayoutEffect(() => {
      if (focus) {
        ref.current?.focus();
      } else {
        ref.current?.blur();
      }
    }, [focus]);

    return (
      <Select
        ref={ref}
        styles={{
          singleValue: (provided) => ({
            ...provided,
            color: "hsl(var(--nextui-foreground))",
          }),

          menuList: (provided) => ({
            ...provided,
            backgroundColor: `hsl(var(--nextui-content1) / var(--nextui-content1-opacity, var(--tw-bg-opacity)))`,
            color: "hsl(var(--nextui-foreground))",
          }),
          container: (provided) => ({
            ...provided,
            flex: 1,
            alignSelf: "stretch",
            pointerEvents: focus ? undefined : "none",
          }),
          control: (provided) => ({
            ...provided,
            height: "100%",
            border: "none",
            boxShadow: "none",
            background: "none",
          }),
          indicatorSeparator: (provided) => ({
            ...provided,
            opacity: 0,
          }),
          indicatorsContainer: (provided) => ({
            ...provided,
            opacity: active ? 1 : 0,
          }),
          placeholder: (provided) => ({
            ...provided,
            opacity: active ? 1 : 0,
          }),
          option: (provided, state) => ({
            ...provided,
            cursor: "pointer",
            backgroundColor: state.isSelected
              ? "hsl(var(--nextui-primary) / var(--nextui-primary-opacity, var(--tw-bg-opacity)))" // Color de fondo cuando está seleccionado (azul)
              : state.isFocused
              ? `hsl(var(--nextui-default-100) / var(--nextui-default-100-opacity, var(--tw-bg-opacity)))`
              : "hsl(var(--nextui-content1) / var(--nextui-content1-opacity, var(--tw-bg-opacity)))", // Color de fondo por defecto
            color: state.isSelected
              ? "hsl(var(--nextui-foreground))" // Color de texto cuando está seleccionado
              : "hsl(var(--nextui-foreground))", //
          }),
        }}
        // isDisabled={columnData.disabled}
        value={
          columnData.choices.find(({ value }) => value === rowData) ?? null
        }
        menuPortalTarget={document.body}
        menuIsOpen={focus}
        onChange={(choice) => {
          if (choice === null) return;

          setRowData(choice.value);
          setTimeout(stopEditing, 0);
        }}
        onMenuClose={() => stopEditing({ nextRow: false })}
        options={columnData.choices}
      />
    );
  }
);

SelectComponent.displayName = "SelectComponent";

export const selectColumn = (
  options: SelectOptions
): Column<string | null, SelectOptions> => ({
  component: SelectComponent as any,
  columnData: options,
  disableKeys: true,
  keepFocus: true,
  disabled: options.disabled,
  deleteValue: () => null,
  copyValue: ({ rowData }) =>
    options.choices.find((choice) => choice.value === rowData)?.label ?? null,
  pasteValue: ({ value }) =>
    options.choices.find((choice) => choice.label === value)?.value ?? null,
});
