import { CourseCard } from "@/components/card/course-card";

export default function Course() {
  return (
    <div className="layout flex flex-col p-10 h-[calc(100svh-77px)]">
      <div className="grid grid-cols-2 gap-8">
        <CourseCard data={data_course} />
        <CourseCard data={data_course} />
        <CourseCard data={data_course} />
        <CourseCard data={data_course} />
      </div>
    </div>
  );
}

export const data_course = {
  title: "Javascript Introduction",
  date: "Jan 2, 2022",
  time: "13:00 - 15:00",
  session: "Session 1",
  course: "Javascript Programming",
};
