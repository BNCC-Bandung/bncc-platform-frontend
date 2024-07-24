"use client";

import Image from "next/image";
import { ModeToggle } from "../theme/theme-toggle";
import { SelectPeriod } from "../ui-interact/select-period";
import Navigation from "./navigation";
import { Button } from "../ui/button";

import { LogOut } from "lucide-react";
import { useLogout } from "@/api/api-backend";

export default function Header() {
  const { mutate, isPending } = useLogout();

  return (
    <header className="border-b h-14">
      <div className="layout flex justify-between h-full items-center">
        <div className="min-w-[200px]">
          <Image
            src="/img/logo-lnt.png"
            width={200}
            height={40}
            alt="BNCC Logo"
          />
        </div>

        <Navigation />
        <div className="flex gap-2 items-center text-sm">
          <SelectPeriod />
          <ModeToggle />
          <Button
            variant="destructive"
            className="w-28"
            onClick={() => mutate()}
            disabled={isPending}
          >
            Log Out
            <LogOut size={15} className="ml-1" />
          </Button>
        </div>
      </div>
    </header>
  );
}
