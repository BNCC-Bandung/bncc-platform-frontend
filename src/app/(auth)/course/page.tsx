import { Courses } from "@/components/Course/courses";

export default function CoursePage() {
  return (
    <div className="layout flex flex-col p-10 h-[calc(100svh-77px)]">
      <div className="grid grid-cols-2 gap-8">
        <Courses />
      </div>
    </div>
  );
}
