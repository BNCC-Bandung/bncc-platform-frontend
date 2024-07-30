"use client";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

import { DialogHeader } from "@/components/ui/dialog";

import { useGetCourse } from "@/api/api-backend";
import { useState } from "react";
import { FormAddAssignment } from "./add-assignment-form";

export function AddAssignment({ courseId }: { courseId: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const { data: course } = useGetCourse(courseId);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <Plus className="mr-1" />
          Add Assignment to {course?.name}
        </Button>
      </DialogTrigger>
      <DialogContent className="h-fit">
        <DialogHeader>
          <DialogTitle>Add Assignment</DialogTitle>
        </DialogHeader>
        <FormAddAssignment courseId={courseId} setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
}
