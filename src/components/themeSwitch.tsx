"use client";
import clsx from "clsx";
import { useTheme } from "next-themes";
import { Button } from "@nextui-org/button";
import { MoonFilledIcon } from "@/ui/icons/moon";
import { SunFilledIcon } from "@/ui/icons/sun";

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();

  const handleClick = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div
      className={clsx(
        "px-px transition-opacity hover:opacity-80 cursor-pointer"
      )}
      onClick={handleClick}>
      {theme === "light" ? (
        <SunFilledIcon size={20} />
      ) : (
        <MoonFilledIcon size={20} />
      )}
    </div>
  );
}
