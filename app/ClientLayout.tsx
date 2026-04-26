"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "./context/ThemeContext";

export default function ClientLayout({ children }: { children: ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
