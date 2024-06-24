import { Card, CardHeader } from "@/components/ui/card";
import { AttendanceType } from "@/types/attendance-type";
import { Frown } from "lucide-react";

export function AttendanceList({
  data,
}: {
  data: AttendanceType[] | undefined;
}) {
  return (
    <Card className="h-fit text-center">
      <CardHeader className="flex justify-center w-full items-center">
        <Frown size={80} strokeWidth={1} />
        <span>Looks like none of the students have attended yet.</span>
      </CardHeader>
    </Card>
  );
}
