"use client";

import { useUserProfile } from "@/api/api-backend";
import { UpcomingCourses } from "./upcoming-courses";
import { CoursesProgress } from "./courses-progress";
import { AvailableCourses } from "../course/components/available-courses";
import { Accordion } from "@/components/ui/accordion";

export function DashboardModule() {
  const { data } = useUserProfile();
  return (
    <>
      {!data?.isAdmin ? (
        <div className="flex gap-10 mt-10 w-full flex-grow">
          <UpcomingCourses />
          <CoursesProgress />
        </div>
      ) : (
        <Accordion type="single" collapsible defaultValue="item-main">
          <AvailableCourses />
        </Accordion>
      )}
    </>
  );
}
