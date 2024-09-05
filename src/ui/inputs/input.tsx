import { InputProps } from "@/types";
import { Input } from "@nextui-org/input";
import { Controller } from "react-hook-form";

export function ControlledInput({
  control,
  placeholder,
  startContent,
  type,
  rules,
  name,
  error,
}: InputProps) {
  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      render={({ field: { onChange, value } }) => (
        <div className="w-full relative">
          <Input
            onChange={onChange}
            classNames={{
              inputWrapper: "bg-default-100",
              input: "text-sm",
            }}
            value={value}
            defaultValue={value}
            validate={undefined}
            labelPlacement="inside"
            label={placeholder}
            startContent={startContent}
            type={type}
          />
          {error && (
            <p className="text-red-500 text-tiny absolute">{error.message}</p>
          )}
        </div>
      )}
    />
  );
}
