"use client";

import { useGetAllSessions } from "@/api/api-backend";
import { SessionCard } from "./session-card";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function Courses({ courseId }: { courseId: string }) {
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
      {sessionsData &&
        sessionsData.map((session, index) => {
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
