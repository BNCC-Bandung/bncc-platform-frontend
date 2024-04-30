"use client";

import Image from "next/image";
import { ModeToggle } from "../theme/theme-toggle";
import { SelectPeriod } from "../ui-interact/select-period";
import Navigation from "./navigation";
import { Button } from "../ui/button";

import { LogOut } from "lucide-react";
import be from "@/api/axios-instace";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  async function handleLogout() {
    try {
      await be.delete("/auth/logout");
      router.push("/login");
    } catch (error) {
      console.error(error);
    }
  }

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
          <Button variant="destructive" onClick={handleLogout}>
            Logout
            <LogOut size={15} className="ml-1" />
          </Button>
        </div>
      </div>
    </header>
  );
}
