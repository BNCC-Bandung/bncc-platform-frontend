import { CoursesProgress } from "@/components/Dashboard/courses-progress";
import { UpcomingCourses } from "@/components/Dashboard/upcoming-courses";
import { UserProfile } from "@/components/Dashboard/user-profile";

export default function Dashboard() {
  return (
    <div className="layout flex flex-col p-5 min-h-screen">
      <UserProfile />

      <div className="flex gap-10 mt-10 w-full flex-grow">
        <UpcomingCourses />
        <CoursesProgress />
      </div>
    </div>
  );
}
