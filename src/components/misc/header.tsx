"use client";

import Image from "next/image";
import { ModeToggle } from "../theme/theme-toggle";
import { SelectPeriod } from "../ui-interact/select-period";
import Navigation from "./navigation";
import { Button } from "../ui/button";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { LogOut } from "lucide-react";

export default function Header() {
  const { logout } = useContext(AuthContext)!;
  return (
    <header className="border-b">
      <div className="layout flex justify-between items-center">
        <Image
          src="/img/logo-lnt.png"
          width={250}
          height={40}
          alt="BNCC Logo"
        />
        <Navigation />
        <div className="flex gap-2 items-center text-sm">
          <SelectPeriod />
          <ModeToggle />
          <Button variant="destructive" onClick={logout}>
            Logout
            <LogOut size={15} className="ml-1" />
          </Button>
        </div>
      </div>
    </header>
  );
}
