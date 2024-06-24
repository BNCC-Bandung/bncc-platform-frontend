"use client";
import { useContext } from "react";
import { CourseContext } from "@/components/contexts/CourseContext";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { SessionCard } from "../../course/components/course-card";

export default function Attendance() {
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
              isAttendance={true}
              isButtonHidden={false}
            />
          );
        })}
    </>
  );
}
