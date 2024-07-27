"use client";

import { useUserProfile } from "@/api/api-backend";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Attendance } from "../attendance/components/attendance";

export default function AttendanceLecturerPage() {
  const { data } = useUserProfile();
  const enrollments = data?.enrollments.filter(
    (enrollment) => enrollment.approved && enrollment.isLecturer
  );

  return (
    <div className="layout flex flex-col p-10 min-h-[calc(100vh-3.5rem)]">
      <Accordion
        type="multiple"
        defaultValue={data?.enrollments.map(
          (enrollment, index) => `item-${index}`
        )}
      >
        {enrollments?.map((course, idx) => (
          <AccordionItem key={idx} value={`item-${idx}`}>
            <AccordionTrigger>
              <div className="flex gap-2 items-center">
                <Badge
                  className={cn(
                    "h-fit no-underline",
                    course.isLecturer ? "bg-green-400" : "bg-blue-400"
                  )}
                >
                  {course.isLecturer ? "Lecturer" : "Student"}
                </Badge>
                <h1 className="text-2xl font-bold">{course.course.name}</h1>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-2 gap-4">
                <Attendance
                  courseId={course.courseId}
                  isLecturer={course.isLecturer}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
