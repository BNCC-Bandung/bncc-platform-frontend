import Footer from "@/components/misc/footer";
import Header from "@/components/misc/header";

import { AuthContext } from "@/context/AuthContext";

import { useContext, useEffect } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-background font-sans antialiased">
        {children}
      </div>
      <Footer />
    </>
  );
}
