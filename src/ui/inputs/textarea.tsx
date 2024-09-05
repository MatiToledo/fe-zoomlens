import { InputProps } from "@/types";
import { Textarea } from "@nextui-org/input";
import { Controller } from "react-hook-form";

export function ControlledTextArea({
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
          <Textarea
            onChange={onChange}
            aria-label="Search"
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
