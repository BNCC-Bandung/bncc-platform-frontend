import {
  useGetAllSubmissions,
  useGetCourse,
  useGetSubmission,
} from "@/api/api-backend";
import { Table, TableBody, TableCell } from "@/components/ui/table";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SubmissionDataType } from "@/types/submission-data-type";

import { format, parse } from "date-fns";
import { id } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { CourseDataType } from "@/types/course-data-type";
import { FormUploadSubmission } from "./user-submission-form";
import { CURRENT_DATE_FORMAT } from "@/lib/date";

export default function UserSubmission({ courseId }: { courseId: string }) {
  return (
    <div className="flex flex-col gap-4">
      <Table>
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
          <UserSubmissionColumn courseId={courseId} />
        </TableBody>
      </Table>
    </div>
  );
}

function UserSubmissionColumn({ courseId }: { courseId: string }) {
  const { data } = useGetAllSubmissions(courseId);

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
    const parsedDate = parse(time, CURRENT_DATE_FORMAT, new Date());
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
