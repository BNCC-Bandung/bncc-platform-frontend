import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function CoursesProgress() {
  return (
    <Card className="w-full h-fit">
      <CardHeader>
        <CardTitle>Class Progress</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-4 justify-center items-center h-[400px]">
          <div className="bg-foreground text-background flex justify-center items-center text-4xl font-extrabold font-mono rounded-full w-56 h-56">
            0/100
          </div>

          <div className="flex flex-col w-full space-y-2">
            <div className="flex justify-between">
              <CardDescription>Attendace</CardDescription>
              <CardDescription>0%</CardDescription>
            </div>
            <Progress value={0} max={100} className="h-2" />
            <div className="flex justify-between">
              <CardDescription>Submission</CardDescription>
              <CardDescription>50%</CardDescription>
            </div>
            <Progress value={50} max={100} className="h-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
