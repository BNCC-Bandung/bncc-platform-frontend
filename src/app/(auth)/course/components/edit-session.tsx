"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";
import { FormAddSession } from "./add-session-form";
import { useState } from "react";
import { SessionDataType } from "@/types/session-data-type";

export function EditSession({ session }: { session: SessionDataType }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Button size="sm" className="space-x-3">
          <PencilIcon size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Edit session</DialogTitle>
          <DialogDescription>Edit session for this course.</DialogDescription>
        </DialogHeader>
        <FormAddSession
          courseId={session.courseId}
          session={session}
          setIsOpen={setIsOpen}
          isEditing={true}
        />
      </DialogContent>
    </Dialog>
  );
}
