"use client";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PencilIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

import { DialogHeader } from "@/components/ui/dialog";

import { useState } from "react";
import { FormAddAssignment } from "./add-assignment-form";
import { SubmissionDataType } from "@/types/submission-data-type";

export function EditAssignment({
  courseId,
  submission,
}: {
  courseId: string;
  submission: SubmissionDataType;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="space-x-2">
          <span>Edit</span>
          <PencilIcon size={15} />
        </Button>
      </DialogTrigger>
      <DialogContent
        className="h-fit"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Edit Assignment</DialogTitle>
        </DialogHeader>
        <FormAddAssignment
          courseId={courseId}
          setIsOpen={setIsOpen}
          submission={submission}
          isEditing
        />
      </DialogContent>
    </Dialog>
  );
}
