"use client";

import { useUpcomingSessions, useUserProfile } from "@/api/api-backend";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EnrollmentsCourseType } from "@/types/user-data-type";
import { SessionCard } from "../course/components/card-session";

export function UpcomingCourses() {
  const { data } = useUserProfile();
  const enrollments = data?.enrollments.filter(
    (enrollment) => enrollment.approved
  );

  return (
    <Card className="w-full h-fit">
      <CardHeader>
        <CardTitle>Upcoming Class</CardTitle>
      </CardHeader>

      <CardContent className="gap-4 flex flex-col ">
        {enrollments?.map((enrollment, index) => (
          <UpcomingCourse key={index} enrollment={enrollment} />
        ))}
      </CardContent>
    </Card>
  );
}

function UpcomingCourse({ enrollment }: { enrollment: EnrollmentsCourseType }) {
  const { data } = useUpcomingSessions(enrollment.courseId);
  console.log(enrollment.courseId);

  return (
    <>
      {data?.map((session, index) => (
        <SessionCard
          key={index}
          session={session}
          isAttendance={false}
          isButtonHidden={true}
        />
      ))}
    </>
  );
}
