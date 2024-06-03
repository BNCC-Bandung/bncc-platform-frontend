import "@/styles/globals.css";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ModeToggle } from "@/components/theme/theme-toggle";

import { Suspense } from "react";
import { ReactQueryProvider } from "@/components/contexts/ReactQueryProvider";
import { AuthContextProvider } from "@/components/contexts/AuthContextProvider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ReactQueryProvider>
          <AuthContextProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </AuthContextProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
