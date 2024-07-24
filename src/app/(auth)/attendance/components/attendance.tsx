"use client";
import { useContext } from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { SessionCard } from "../../course/components/card-session";

export default function Attendance() {
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
