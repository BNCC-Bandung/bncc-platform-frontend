"use client";

import Footer from "@/components/misc/footer";
import Header from "@/components/misc/header";
import Navigation from "@/components/misc/navigation";
import { AuthContext } from "@/context/AuthContext";
import { useContext, useEffect } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { getProfile } = useContext(AuthContext)!;

  useEffect(() => {
    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
