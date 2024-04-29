import Image from "next/image";
import { ModeToggle } from "../theme/theme-toggle";
import { SelectPeriod } from "../ui-interact/select-period";
import Navigation from "./navigation";

export default function Header() {
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
        </div>
      </div>
    </header>
  );
}
