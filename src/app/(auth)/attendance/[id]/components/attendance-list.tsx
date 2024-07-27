import { Card, CardHeader } from "@/components/ui/card";
import { AttendanceType } from "@/types/attendance-type";
import { Frown } from "lucide-react";

export function AttendanceList({ data }: { data: AttendanceType[] }) {
  if (data.length === 0) {
    return <NoAttendance />;
  }
  return data.map((attendance, index) => (
    <Card key={index} className="w-full h-fit flex">
      <CardHeader className="text-center w-full">
        <h1 className="text-2xl font-bold">{attendance.fullName}</h1>
        <span className="font-bold text-4xl">{attendance.attendTime}</span>
      </CardHeader>
    </Card>
  ));
}

function NoAttendance() {
  return (
    <Card className="h-fit text-center">
      <CardHeader className="flex justify-center w-full items-center">
        <Frown size={80} strokeWidth={1} />
        <span>Looks like none of the students have attended yet.</span>
      </CardHeader>
    </Card>
  );
}
