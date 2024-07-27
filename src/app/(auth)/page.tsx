import { CoursesProgress } from "./components/courses-progress";
import { UpcomingCourses } from "./components/upcoming-courses";
import { UserProfile } from "./components/user-profile";

export default function Dashboard() {
  return (
    <div className="layout flex flex-col p-5 min-h-[calc(100vh-3.5rem)]">
      <UserProfile />

      <div className="flex gap-10 mt-10 w-full flex-grow">
        <UpcomingCourses />
        <CoursesProgress />
      </div>
    </div>
  );
}
