import "@/styles/global.css";
import clsx from "clsx";
import { Metadata } from "next";
import { fontSans } from "../config/fonts";
import { siteConfig } from "../config/site";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased ",
          fontSans.variable
        )}>
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          <main className="flex flex-col grow">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
