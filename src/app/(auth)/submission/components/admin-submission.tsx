import { Table } from "@/components/ui/table";
import { Download, Eye, Trash } from "lucide-react";

import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AddAssignment } from "./add-assignment";
import { useDeleteAssignment, useGetAllSubmitted } from "@/api/api-backend";

import { useGetAllSubmissions, useGetCourse } from "@/api/api-backend";
import { SubmissionDataType } from "@/types/submission-data-type";

import { format, parse } from "date-fns";
import { id } from "date-fns/locale";
import { CourseDataType } from "@/types/course-data-type";
import UnstyledLink from "@/components/link/unstyled-link";
import { EditAssignment } from "./edit-assignment";
import { CURRENT_DATE_FORMAT } from "@/lib/date";

export default function AdminSubmission({ courseId }: { courseId: string }) {
  return (
    <div className="flex flex-col gap-2">
      <AddAssignment courseId={courseId} />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Deadline</TableHead>
            <TableHead>Course</TableHead>
            <TableHead className="text-center">Submission</TableHead>
            <TableHead className="text-center">Action</TableHead>
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
  const { data: submitted } = useGetAllSubmitted(
    submission.courseId,
    submission.id
  );
  const { data: course } = useGetCourse(submission.courseId);

  const { mutateAsync: deleteAssignment } = useDeleteAssignment(
    submission.courseId,
    submission.id
  );

  const hasSubmitted = submitted?.submits?.length ?? 0 > 0 ? true : false;

  function parseTimeFormatted(time: string) {
    const parsedDate = parse(time, CURRENT_DATE_FORMAT, new Date());
    return format(parsedDate, "dd MMMM yyyy - HH:mm", { locale: id });
  }

  return (
    <TableRow>
      <TableCell>{submission.title}</TableCell>
      <TableCell>{parseTimeFormatted(submission.deadlineTime)}</TableCell>
      <TableCell>{course?.name}</TableCell>
      <TableCell className="text-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="secondary" disabled={!hasSubmitted}>
              <Eye className="mr-1" size={15} />
              Open
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-1/2 h-fit">
            <DialogHeader>
              <DialogTitle>Assignment Submission</DialogTitle>
            </DialogHeader>
            <div className="overflow-y-scroll flex flex-col gap-2">
              {submitted?.submits?.map((item, index) => (
                <Card className="p-5 flex justify-between" key={index}>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {item.userId}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {item.uploadTime}
                    </p>
                  </div>
                  <UnstyledLink
                    href={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/courses/download/${item.url}`}
                    target="_blank"
                  >
                    <Button variant="secondary">
                      Download <Download className="ml-2" size={15} />
                    </Button>
                  </UnstyledLink>
                </Card>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </TableCell>
      <TableCell className="space-x-1 text-center">
        <Button
          variant="outline"
          className="space-x-2"
          disabled={!hasSubmitted}
        >
          <UnstyledLink
            href={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/courses/${submission.courseId}/submissions/${submission.id}/download`}
            target="_blank"
            className="flex items-center space-x-1"
          >
            <span>Batch Download</span>
            <Download size={15} />
          </UnstyledLink>
        </Button>
        <EditAssignment
          courseId={submission.courseId}
          submission={submission}
        />
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="space-x-2">
              <span>Delete</span>
              <Trash size={15} />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                assignment.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => deleteAssignment()}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </TableCell>
    </TableRow>
  );
}
