import type { Metadata } from "next";
import "./globals.css";

import * as React from "react";

import { NextUIProvider } from "@nextui-org/react";


export const metadata: Metadata = {
  title: "Trabalho GB",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NextUIProvider>{children}</NextUIProvider>
      </body>
    </html>
  );
}
