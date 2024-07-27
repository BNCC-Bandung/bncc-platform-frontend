"use client";

import { useGetAllSessions } from "@/api/api-backend";
import { SessionCard } from "./card-session";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function Courses({
  courseId,
  isLecturer,
}: {
  courseId: string;
  isLecturer: boolean;
}) {
  const { data: sessionsData, isLoading: isSessionsLoading } =
    useGetAllSessions(courseId, { enabled: !!courseId });

  if (isSessionsLoading) {
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
      {sessionsData?.map((session, index) => {
        return (
          <SessionCard
            key={index}
            session={session}
            isAttendance={false}
            isButtonHidden={false}
            isLecturer={isLecturer}
          />
        );
      })}
    </>
  );
}
