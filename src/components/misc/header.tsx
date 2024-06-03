"use client";

import Image from "next/image";
import { ModeToggle } from "../theme/theme-toggle";
import { SelectPeriod } from "../ui-interact/select-period";
import Navigation from "./navigation";
import { Button } from "../ui/button";

import { LoaderCircle, LogOut } from "lucide-react";
import be from "@/api/axios-instace";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

export default function Header() {
  const router = useRouter();

  const { mutate, error, isPending } = useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => {
      await be.delete("/auth/logout");
    },
    onSuccess: () => {
      router.push("/login");
      router.refresh();
    },
  });

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
