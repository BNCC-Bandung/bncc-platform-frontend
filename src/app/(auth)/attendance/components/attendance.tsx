"use client";

import { useGetAllSessions } from "@/api/api-backend";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { SessionCard } from "../../course/components/card-session";

export function Attendance({
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
            isAttendance={true}
            isButtonHidden={false}
            isLecturer={isLecturer}
          />
        );
      })}
    </>
  );
}
