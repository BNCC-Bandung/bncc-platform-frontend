"use client";

import { useGetAllSessions, useUserProfile } from "@/api/api-backend";
import { SessionCard } from "./session-card";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function Courses() {
  const { data } = useUserProfile();
  const courseId = data?.enrollments?.[0]?.courseId || "0";

  const { data: coursesData, isLoading: isCoursesLoading } = useGetAllSessions(
    courseId,
    { enabled: !!courseId }
  );

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
