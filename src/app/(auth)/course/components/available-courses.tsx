import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AvailableCoursesCard } from "./card-available-courses";
import { useUserProfile } from "@/api/api-backend";
import { AddCourse } from "./add-course";

export function AvailableCourses() {
  const { data } = useUserProfile();
  return (
    <AccordionItem value="item-main">
      <AccordionTrigger>
        <h1 className="text-2xl font-bold">Available Courses</h1>
      </AccordionTrigger>
      <AccordionContent>
        {data?.isAdmin && <AddCourse />}
        <div className="grid grid-cols-3 gap-4">
          <AvailableCoursesCard />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
