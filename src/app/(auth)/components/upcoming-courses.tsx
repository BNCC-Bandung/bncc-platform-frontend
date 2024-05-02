import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

export async function UpcomingCourses() {
  return (
    <Card className="w-full h-fit">
      <CardHeader>
        <CardTitle>Upcoming Class</CardTitle>
      </CardHeader>

      <CardContent className="gap-4 flex flex-col "></CardContent>
    </Card>
  );
}
