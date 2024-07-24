import { AvailableCourses } from "./components/available-courses";
import { Courses } from "./components/courses";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function CoursePage() {
  return (
    <div className="layout flex flex-col p-10 h-[calc(100svh-77px)]">
      <Accordion type="single" collapsible defaultValue="item-2">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <h1 className="text-2xl font-bold">Available Courses</h1>
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-3 gap-4">
              <AvailableCourses />
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            <h1 className="text-2xl font-bold">Sessions on enrolled courses</h1>
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-4">
              <Courses />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
