"use client";

import { useUserProfile } from "@/api/api-backend";
import AdminSubmission from "./components/admin-submission";
import UserSubmission from "./components/user-submission";
import {
  Accordion,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AccordionItem } from "@radix-ui/react-accordion";
import { EnrollmentsCourseType } from "@/types/user-data-type";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function Submission() {
  const { data: userData } = useUserProfile();

  function renderSubmissionComponent(
    enrollment: EnrollmentsCourseType,
    index: number
  ) {
    const SubmissionComponent = enrollment.isLecturer
      ? AdminSubmission
      : UserSubmission;

    return (
      <AccordionItem key={index} value={`item-${index}`}>
        <AccordionTrigger>
          <div className="flex gap-2 items-center">
            <Badge
              className={cn(
                "h-fit no-underline",
                enrollment.isLecturer ? "bg-green-400" : "bg-blue-400"
              )}
            >
              {enrollment.isLecturer ? "Lecturer" : "Student"}
            </Badge>
            <h1 className="text-2xl font-bold">{enrollment.course.name}</h1>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <SubmissionComponent key={index} courseId={enrollment.courseId} />
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <div className="layout flex flex-col p-10 min-h-[calc(100vh-3.5rem)]">
      <Accordion
        type="multiple"
        defaultValue={userData?.enrollments.map(
          (enrollment, index) => `item-${index}`
        )}
      >
        {userData?.enrollments
          .filter((enrollment) => enrollment.approved)
          .map(renderSubmissionComponent)}
      </Accordion>
    </div>
  );
}
