import { Table } from "@/components/ui/table";
import { Download, Eye, Pencil, Trash } from "lucide-react";

import {
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  dataAssignmentSubmission,
  dataSubmissionAdminDummy,
} from "./dummy/datadummy";
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
import { useUserProfile } from "@/api/api-backend";

export default function AdminSubmission() {
  const { data } = useUserProfile();
  const courseAsLecturer = data?.enrollments.filter(
    (enrollment) => enrollment.isLecturer
  );

  return (
    <div className="flex flex-col gap-2">
      {courseAsLecturer?.map((course, index) => (
        <AddAssignment key={index} courseId={course.courseId} />
      ))}
      <Table>
        <TableCaption>Manage submissions here.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Deadline</TableHead>
            <TableHead>Submission</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dataSubmissionAdminDummy.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.deadline}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="secondary">
                      <Eye className="mr-1" />
                      Open
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="h-1/2">
                    <DialogHeader>
                      <DialogTitle>Assignment Submission</DialogTitle>
                    </DialogHeader>
                    <div className="overflow-y-scroll flex flex-col gap-2">
                      {dataAssignmentSubmission.map((item, index) => {
                        return (
                          <Card
                            className="p-5 flex justify-between"
                            key={index}
                          >
                            <div className="space-y-1">
                              <p className="text-sm font-medium leading-none">
                                {item.name}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {item.dateSubmit}
                              </p>
                            </div>
                            <Button variant="secondary">
                              Download <Download className="ml-2" size={15} />
                            </Button>
                          </Card>
                        );
                      })}
                    </div>
                  </DialogContent>
                </Dialog>
              </TableCell>
              <TableCell className="flex gap-2">
                <Button variant="ghost" size="icon">
                  <Download />
                </Button>
                <Button variant="ghost" size="icon">
                  {item.status ? <Pencil className="text-muted" /> : <Pencil />}
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Trash className="text-red-400" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete the assignment.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
