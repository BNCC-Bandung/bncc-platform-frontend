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
import { PlusIcon } from "lucide-react";
import { FormAddSession } from "./add-session-form";
import { useState } from "react";

export function AddSession({ courseId }: { courseId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Button size="sm" className="space-x-3 mb-2">
          <span>Add Session</span>
          <PlusIcon size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new session</DialogTitle>
          <DialogDescription>
            Add a new session for this course.
          </DialogDescription>
        </DialogHeader>
        <FormAddSession courseId={courseId} setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
}
