import {
  useDeleteCourse,
  useEnrollCourse,
  useUnenrollCourse,
} from "@/api/api-backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CourseDataType } from "@/types/course-data-type";
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
import { TrashIcon } from "lucide-react";
import { EditCourse } from "./edit-course";

export function CourseCard({
  course,
  enrolled,
  approved,
  isLecturer,
  isAdmin = false,
}: {
  course: CourseDataType;
  enrolled: boolean | undefined;
  approved: boolean | undefined;
  isLecturer: boolean | undefined;
  isAdmin?: boolean;
}) {
  const { mutate: enroll } = useEnrollCourse();
  const { mutate: unenroll } = useUnenrollCourse();
  const { mutateAsync: deleteCourse } = useDeleteCourse();

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>{course.name}</CardTitle>
        <CardDescription className="flex h-5 justify-between">
          <span>Period: {course.period}</span>
          <Badge
            variant="default"
            className={cn(
              !enrolled ? "hidden" : "",
              approved ? "bg-green-500" : "bg-red-400 text-foreground"
            )}
          >
            {approved ? "Approved" : "Pending approval"}
          </Badge>
        </CardDescription>
      </CardHeader>
      {isAdmin ? (
        <CardFooter className="space-x-2 justify-end">
          <>
            {/* Edit Button */}
            <EditCourse course={course} />

            {/* Delete Button */}
            <AlertDialog>
              <AlertDialogTrigger>
                <Button variant="destructive" size="sm" className="w-fit gap-2">
                  <span>Delete</span>
                  <TrashIcon size={15} />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    the course.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-destructive text-foreground"
                    onClick={() => deleteCourse(course.id)}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
        </CardFooter>
      ) : (
        <CardFooter className="flex gap-2">
          {!enrolled && (
            <Button
              disabled={enrolled}
              onClick={() => enroll(course.id)}
              variant="secondary"
            >
              Apply Course
            </Button>
          )}
          {enrolled && !approved && (
            <Button onClick={() => unenroll(course.id)} variant="destructive">
              Cancel enrollment
            </Button>
          )}
          {enrolled && approved && (
            <Button disabled>
              Enrolled as {isLecturer ? "Lecturer" : "Student"}
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
}
