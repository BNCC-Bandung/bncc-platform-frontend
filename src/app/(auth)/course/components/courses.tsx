"use client";
import { useContext } from "react";
import { SessionCard } from "./course-card";
import { CourseContext } from "@/components/contexts/CourseContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function Courses() {
  const { coursesData, isCoursesLoading } = useContext(CourseContext)!;

  if (isCoursesLoading) {
    return (
      <Card className="w-full h-fit flex">
        <div className=" p-6">
          <Skeleton className="h-[150px] w-[150px]" />
        </div>
      </Card>
    );
  }

  return (
    <>
      {coursesData &&
        coursesData.map((session, index) => {
          return (
            <SessionCard
              key={index}
              session={session}
              isAttendance={false}
              isButtonHidden={false}
            />
          );
        })}
    </>
  );
}
