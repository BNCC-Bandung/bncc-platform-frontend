import { SiJavascript } from "react-icons/si";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import {
  BookMarked,
  Calendar,
  LogIn,
  MoveRight,
  Presentation,
  Timer,
} from "lucide-react";

interface CourseCardProps {
  data: {
    title: string;
    date: string;
    time: string;
    session: string;
    course: string;
  };
}

export function CourseCard({
  data: { title, date, time, session, course },
}: CourseCardProps) {
  return (
    <Card className="w-full h-fit flex">
      <SiJavascript className="h-auto w-auto pl-6" size={150} />
      <div className="flex flex-col w-full">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-2 gap-1 space-y-1">
            <CardDescription className="flex items-center gap-1">
              <Calendar size={15} />
              {date}
            </CardDescription>
            <CardDescription className="flex items-center gap-1">
              <Timer size={15} />
              {time}
            </CardDescription>
            <CardDescription className="flex items-center gap-1">
              <Presentation size={15} />
              {session}
            </CardDescription>
            <CardDescription className="flex items-center gap-1">
              <BookMarked size={15} />
              {course}
            </CardDescription>
          </div>
        </CardContent>

        <CardFooter className="flex-row">
          <Button variant="secondary" size="sm" className="w-full gap-2">
            Join Class
            <LogIn size={15} />
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}
