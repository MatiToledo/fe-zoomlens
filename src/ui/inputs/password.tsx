import { InputProps } from "@/types";
import { Input } from "@nextui-org/input";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { EyeSlashFilledIcon, EyeFilledIcon } from "../icons/eye";
import { PasswordIcon } from "../icons/password";

export function ControlledPassword({
  control,
  placeholder,
  rules,
  name,
  error,
}: InputProps) {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      render={({ field: { onChange, value } }) => (
        <div className="w-full relative">
          <Input
            onChange={onChange}
            aria-label="Search"
            classNames={{
              inputWrapper: "bg-default-100",
              input: "text-sm",
            }}
            value={value}
            validate={undefined}
            labelPlacement="inside"
            label={placeholder}
            placeholder={placeholder}
            startContent={
              <PasswordIcon className="text-base text-default-400" />
            }
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}>
                {isVisible ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
          />
          {error && (
            <p className="text-red-500 text-tiny absolute">{error.message}</p>
          )}
        </div>
      )}
    />
  );
}
