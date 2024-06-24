"use client";
import { useContext, useEffect } from "react";
import { AttendanceContext } from "@/components/contexts/AttendanceContext";
import { SessionCard } from "../../../course/components/course-card";
import { CourseContext } from "@/components/contexts/CourseContext";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
import { AttendanceList } from "./attendance-list";

export function AttendanceDetails({ id }: { id: number }) {
  const { attendanceData, getAttendanceList } = useContext(AttendanceContext)!;
  const { data, getCourse } = useContext(CourseContext)!;

  useEffect(() => {
    getAttendanceList?.(id);
    getCourse(id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="flex flex-col gap-4">
        <SessionCard session={data} isAttendance={true} isButtonHidden={true} />

        <div className="grid grid-cols-2 gap-8">
          <Card className="w-full h-fit flex bg-red-400/30">
            <CardHeader className="text-center w-full">
              <h1 className="text-2xl font-bold">Absent</h1>
              <span className="font-bold text-4xl">0</span>
            </CardHeader>
          </Card>
          <Card className="w-full h-fit flex bg-green-400/30">
            <CardHeader className="text-center w-full">
              <h1 className="text-2xl font-bold">Present</h1>
              <span className="font-bold text-4xl">0</span>
            </CardHeader>
          </Card>
        </div>

        <Button variant="secondary" className="w-full space-x-2 text-md">
          <span>Export to Excel</span>
          <FileDown size={20} />
        </Button>
      </div>

      <AttendanceList data={attendanceData} />
    </>
  );
}
