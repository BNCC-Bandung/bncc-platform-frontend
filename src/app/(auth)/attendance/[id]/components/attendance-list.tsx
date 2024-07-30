import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AttendanceType } from "@/types/attendance-type";
import { format, parseISO } from "date-fns";
import { Frown } from "lucide-react";

export function AttendanceList({ data }: { data: AttendanceType[] }) {
  if (data.length === 0) {
    return <NoAttendance />;
  }
  return data.map((attendance, index) => (
    <Card key={index} className="w-full h-fit flex">
      <CardHeader className="w-full flex flex-row justify-between">
        <div>
          <CardTitle>{attendance.fullName}</CardTitle>
          <CardDescription>
            {format(parseISO(attendance.attendTime), "PPP HH:mm:ss")}
          </CardDescription>
        </div>
        <div>
          <Badge variant={attendance.status === 0 ? "default" : "destructive"}>
            {attendance.status === 0 ? "On Time" : "Late"}
          </Badge>
        </div>
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
