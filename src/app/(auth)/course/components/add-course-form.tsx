"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoaderCircle } from "lucide-react";
import { useAddCourse, useEditCourse } from "@/api/api-backend";
import { courseSchema, CourseSchema } from "@/validations/course-schema";
import { CourseDataType } from "@/types/course-data-type";

export function FormAddCourse({
  courseId,
  setIsOpen,
  course,
  isEditing = false,
}: {
  courseId: string;
  setIsOpen: (isOpen: boolean) => void;
  course?: CourseDataType;
  isEditing?: boolean;
}) {
  // Determine which hook to use based on isEditing flag
  const {
    mutateAsync: mutateAddCourse,
    error: addError,
    isPending: isPendingAdd,
  } = useAddCourse(setIsOpen);

  const {
    mutateAsync: mutateEditCourse,
    error: editError,
    isPending: isPendingEdit,
  } = useEditCourse(courseId, setIsOpen);

  // Select appropriate mutation function and states
  const mutateAsync = isEditing ? mutateEditCourse : mutateAddCourse;
  const error = isEditing ? editError : addError;
  const isPending = isEditing ? isPendingEdit : isPendingAdd;

  const form = useForm<CourseSchema>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      name: course?.name,
      period: course?.period,
    },
  });

  async function onSubmit(values: CourseSchema) {
    await mutateAsync(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="name">Name</FormLabel>
              <FormControl className="grid gap-2">
                <Input
                  id="name"
                  type="text"
                  placeholder="Frontend Development"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="period"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="period">Period</FormLabel>
              <FormControl className="grid gap-2">
                <Input
                  id="period"
                  type="text"
                  inputMode="numeric"
                  placeholder="35"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormDescription className="text-red-900">
          {error?.message}{" "}
          {(error?.response?.data as { message: string })?.message}
        </FormDescription>

        <Button className="w-full space-x-2" disabled={isPending}>
          {isPending ? (
            <>
              <span>Loading</span>
              <LoaderCircle className="animate-spin" />
            </>
          ) : isEditing ? (
            "Edit Course"
          ) : (
            "Add Course"
          )}
        </Button>
      </form>
    </Form>
  );
}
