import { InputProps } from "@/types";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { Controller } from "react-hook-form";

export function ControlledAutocomplete({
  name,
  control,
  rules,
  label,
  options,
  error,
  size = "sm",
}: InputProps) {
  return (
    <Controller
      key={`controller-${name}`} // Unique key for Controller
      name={name}
      rules={rules}
      control={control}
      render={({ field: { onChange, value, ...props } }) => {
        const selectedKey =
          options.find((option: any) => option.label === value)?.value || null;
        return (
          <div className="w-full relative">
            <Autocomplete
              {...props}
              onSelectionChange={(selectedValue) => {
                const selectedOption = options.find(
                  (option: any) => option.value === selectedValue
                );
                onChange(selectedOption?.label || "");
              }}
              defaultInputValue={
                options.find((option: any) => option.value === value)?.label
              }
              value={value}
              isClearable={false}
              label={label}
              selectedKey={selectedKey}
              fullWidth
              size={size}
              aria-label={`Autocomplete ${name}`}>
              {options.map((option: any) => (
                <AutocompleteItem key={option.value} value={option.value}>
                  {option.label}
                </AutocompleteItem>
              ))}
            </Autocomplete>

            {error && (
              <p className="text-red-500 text-tiny absolute">{error.message}</p>
            )}
          </div>
        );
      }}
    />
  );
}
