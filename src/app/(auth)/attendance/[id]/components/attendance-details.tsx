"use client";

import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
import { AttendanceList } from "./attendance-list";
import { SessionCard } from "@/app/(auth)/course/components/card-session";
import { useGetAllAttendance } from "@/api/api-backend";
import { Skeleton } from "@/components/ui/skeleton";
import UnstyledLink from "@/components/link/unstyled-link";

export function AttendanceDetails({ id }: { id: string }) {
  const { data } = useGetAllAttendance(id);

  if (!data) {
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
      <div className="flex flex-col gap-4">
        <SessionCard
          session={data?.session}
          isAttendance={true}
          isButtonHidden={true}
          isLecturer={false}
        />

        <div className="grid grid-cols-2 gap-8">
          <Card className="w-full h-fit flex bg-red-400/30">
            <CardHeader className="text-center w-full">
              <h1 className="text-2xl font-bold">Absent</h1>
              <span className="font-bold text-4xl">
                {data.attendanceData.totalUserNotAttendance}
              </span>
            </CardHeader>
          </Card>
          <Card className="w-full h-fit flex bg-green-400/30">
            <CardHeader className="text-center w-full">
              <h1 className="text-2xl font-bold">Present</h1>
              <span className="font-bold text-4xl">
                {data.attendanceData.totalUserAttendance}
              </span>
            </CardHeader>
          </Card>
        </div>

        <Button variant="secondary">
          <UnstyledLink
            href={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/attendances/sessions/${data.session.id}/excel/download`}
            className="w-full flex justify-center text-center space-x-2 text-md"
          >
            <span>Export to Excel</span>
            <FileDown size={20} />
          </UnstyledLink>
        </Button>
      </div>

      <AttendanceList data={data?.userAttendances} />
    </>
  );
}
