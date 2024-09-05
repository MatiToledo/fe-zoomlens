import { InputProps } from "@/types";
import { Select, SelectItem } from "@nextui-org/select";
import { Controller } from "react-hook-form";

export function ControlledSelect({
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
      key={`select ${name} ${label}`}
      name={name}
      rules={rules}
      control={control}
      render={({ field: { onChange, value } }) => {
        return (
          <div className="w-full relative">
            <Select
              key={`select ${name} ${label}`}
              aria-label={`Select ${name} ${value}`}
              label={label}
              value={value}
              defaultSelectedKeys={[value]}
              onChange={onChange}
              fullWidth
              size={size}>
              {options.map((option: any) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </Select>
            {error && (
              <p className="text-red-500 text-tiny absolute">{error.message}</p>
            )}
          </div>
        );
      }}
    />
  );
}
