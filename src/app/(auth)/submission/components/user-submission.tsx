import {
  useGetAllSubmissions,
  useGetCourse,
  useGetSubmission,
  useUserProfile,
} from "@/api/api-backend";
import { Table, TableBody, TableCell } from "@/components/ui/table";
import {
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SubmissionDataType } from "@/types/submission-data-type";
import { EnrollmentsCourseType } from "@/types/user-data-type";

import { format, parse } from "date-fns";
import { id } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { CourseDataType } from "@/types/course-data-type";
import { FormUploadSubmission } from "./user-submission-form";

export default function UserSubmission() {
  const { data } = useUserProfile();
  const enrollments = data?.enrollments.filter(
    (enrollment) => enrollment.approved
  );

  return (
    <Table>
      <TableCaption>A list of your needed submissions.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Deadline</TableHead>
          <TableHead>Course</TableHead>
          <TableHead>Upload</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {enrollments?.map((enrollment, index) => (
          <UserSubmissionColumn key={index} enrollment={enrollment} />
        ))}
      </TableBody>
    </Table>
  );
}

function UserSubmissionColumn({
  enrollment,
}: {
  enrollment: EnrollmentsCourseType;
}) {
  const { data } = useGetAllSubmissions(enrollment.courseId);

  return (
    <>
      {data?.map((submission: SubmissionDataType, index: number) => (
        <UserSubmissionRow key={index} submission={submission} />
      ))}
    </>
  );
}

export function UserSubmissionRow({
  submission,
}: {
  submission: SubmissionDataType;
  course?: CourseDataType;
}) {
  const { data: submitted } = useGetSubmission(
    submission.courseId,
    submission.id
  );
  const { data: course } = useGetCourse(submission.courseId);

  function parseTimeFormatted(time: string) {
    const parsedDate = parse(time, "dd-MM-yyyy HH:mm:ss", new Date());
    return format(parsedDate, "dd MMMM yyyy - HH:mm", { locale: id });
  }

  return (
    <TableRow>
      <TableCell>{submission.title}</TableCell>
      <TableCell>{parseTimeFormatted(submission.deadlineTime)}</TableCell>
      <TableCell>{course?.name}</TableCell>
      <TableCell className="flex gap-4">
        <FormUploadSubmission submission={submission} />
      </TableCell>
      <TableCell>
        {submitted ? (
          <Badge variant="default">
            Submitted: {parseTimeFormatted(submitted.uploadTime)}
          </Badge>
        ) : (
          <Badge variant="destructive">Not submitted</Badge>
        )}
      </TableCell>
    </TableRow>
  );
}
