"use client";
import "react-toastify/dist/ReactToastify.css";
import "react-datasheet-grid/dist/style.css";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Slide, ToastContainer } from "react-toastify";

export function Providers({ children, themeProps }: any) {
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      <ToastContainer transition={Slide} />
      <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
    </NextUIProvider>
  );
}
