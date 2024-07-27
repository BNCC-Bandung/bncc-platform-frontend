"use client";

import { Button } from "@/components/ui/button";
import { AttendaceForm } from "./components/attendance-form";
import { InfoIcon } from "lucide-react";
import UnstyledLink from "@/components/link/unstyled-link";

export default function AttendancePage() {
  return (
    <div className="layout flex justify-center items-center flex-col p-10 min-h-[calc(100vh-3.5rem)]">
      <div>
        <AttendaceForm />
        <UnstyledLink
          href="/session
        "
        >
          <Button className="w-full mt-4 space-x-2" variant="outline">
            <InfoIcon size={15} />
            <span>See Attendance</span>
          </Button>
        </UnstyledLink>
      </div>
    </div>
  );
}
