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
import { useState } from "react";
import { CourseDataType } from "@/types/course-data-type";
import { FormAddCourse } from "./add-course-form";

export function EditCourse({ course }: { course: CourseDataType }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Button size="sm" className="space-x-3">
          <span>Edit </span>
          <PencilIcon size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Edit course</DialogTitle>
          <DialogDescription>
            Edit course for selected period.
          </DialogDescription>
        </DialogHeader>
        <FormAddCourse
          courseId={course.id}
          course={course}
          setIsOpen={setIsOpen}
          isEditing={true}
        />
      </DialogContent>
    </Dialog>
  );
}
