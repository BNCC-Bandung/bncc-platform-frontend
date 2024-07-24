import { useEnrollCourse, useUnenrollCourse } from "@/api/api-backend";
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

export function CourseCard({
  course,
  enrolled,
  approved,
}: {
  course: CourseDataType;
  enrolled: boolean | undefined;
  approved: boolean | undefined;
}) {
  const { mutate: enroll } = useEnrollCourse();
  const { mutate: unenroll } = useUnenrollCourse();

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
        {enrolled && (
          <Button onClick={() => unenroll(course.id)} variant="destructive">
            Cancel enrollment
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
