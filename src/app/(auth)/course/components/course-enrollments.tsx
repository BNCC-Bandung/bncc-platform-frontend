import {
  useApproveEnrollment,
  useGetAllCourses,
  useGetAllEnrollments,
  useSetLecturerEnrollment,
} from "@/api/api-backend";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { cn } from "@/lib/utils";
import { EnrollmentsCourseType } from "@/types/user-data-type";

export function CourseEnrollments() {
  const { data: courses } = useGetAllCourses();

  return (
    <Accordion
      type="multiple"
      defaultValue={courses?.map((_, idx) => `item-${idx}`)}
    >
      {courses?.map((course, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger>
            <div className="flex gap-2 items-center">
              <h1 className="text-2xl font-bold">{course.name}</h1>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Enrollments courseId={course.id} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

function Enrollments({ courseId }: { courseId: string }) {
  const { data } = useGetAllEnrollments(courseId);

  return (
    <Table>
      <TableCaption>Enrollments for this course</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Full Name</TableHead>
          <TableHead>User ID</TableHead>
          <TableHead className="text-end">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((enrollment, idx) => (
          <TableRow key={idx}>
            <TableCell>{enrollment.user.fullName}</TableCell>
            <TableCell>{enrollment.userId}</TableCell>
            <TableCell className="flex gap-4 text-center items-center justify-end flex-wrap">
              <SetFunction enrollment={enrollment} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function SetFunction({ enrollment }: { enrollment: EnrollmentsCourseType }) {
  const { mutateAsync: setEnrollment } = useSetLecturerEnrollment(
    enrollment.courseId,
    enrollment.userId
  );

  const { mutateAsync: approveEnrollment } = useApproveEnrollment(
    enrollment.courseId,
    enrollment.userId
  );

  return (
    <>
      <Button
        onClick={() => approveEnrollment()}
        className={cn(
          enrollment.approved ? "bg-red-400" : "bg-green-400",
          "w-36"
        )}
      >
        {enrollment.approved ? "Unapprove" : "Approve"}
      </Button>
      <Button
        onClick={() => setEnrollment()}
        variant="secondary"
        className={cn(enrollment.isLecturer && "bg-blue-400", "w-36")}
      >
        Set as {enrollment.isLecturer ? "Student" : "Lecturer"}
      </Button>
    </>
  );
}
