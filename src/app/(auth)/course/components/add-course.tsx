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
import { useState } from "react";
import { FormAddCourse } from "./add-course-form";

export function AddCourse() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Button size="sm" className="space-x-3 mb-2">
          <span>Add Course</span>
          <PlusIcon size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new course</DialogTitle>
          <DialogDescription>
            Add a new course for certain period.
          </DialogDescription>
        </DialogHeader>
        <FormAddCourse courseId={"0"} setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
}
