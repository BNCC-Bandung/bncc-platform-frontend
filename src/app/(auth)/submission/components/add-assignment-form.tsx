import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { format, parse } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { TimePicker } from "@/components/ui-interact/time-picker";
import {
  assignmentSchema,
  AssignmentSchema,
} from "@/validations/assignment-schema";
import { CalendarIcon, LoaderCircle } from "lucide-react";
import { useAddAssignment, useEditAssignment } from "@/api/api-backend";
import { Button } from "@/components/ui/button";
import { SubmissionDataType } from "@/types/submission-data-type";
import { CURRENT_DATE_FORMAT } from "@/lib/date";

export function FormAddAssignment({
  courseId,
  setIsOpen,
  submission,
  isEditing = false,
}: {
  courseId: string;
  setIsOpen: (isOpen: boolean) => void;
  submission?: SubmissionDataType;
  isEditing?: boolean;
}) {
  const {
    mutateAsync: mutateAddAssignment,
    error: addError,
    isPending: isPendingError,
  } = useAddAssignment(courseId, setIsOpen);

  const {
    mutateAsync: mutateEditAssignment,
    error: editError,
    isPending: isPendingEdit,
  } = useEditAssignment(courseId, submission?.id || "0", setIsOpen);

  const mutateAsync = isEditing ? mutateEditAssignment : mutateAddAssignment;
  const error = isEditing ? editError : addError;
  const isPending = isEditing ? isPendingEdit : isPendingError;

  const form = useForm<AssignmentSchema>({
    resolver: zodResolver(assignmentSchema),
    defaultValues: {
      title: submission?.title,
      deadlineTime: parse(
        submission?.deadlineTime || format(new Date(), CURRENT_DATE_FORMAT),
        CURRENT_DATE_FORMAT,
        new Date()
      ),
    },
  });

  async function onSubmit(values: AssignmentSchema) {
    mutateAsync(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="text">Course Title</FormLabel>
              <FormControl className="grid gap-2">
                <Input
                  id="title"
                  type="text"
                  placeholder="Final Project Backend Development"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="deadlineTime"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Deadline</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP HH:mm:ss")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                  <div className="p-3 border-t border-border">
                    <TimePicker setDate={field.onChange} date={field.value} />
                  </div>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        {error && (
          <FormDescription className="text-red-900">
            {(error.response?.data as { message: string })?.message}
          </FormDescription>
        )}

        <Button className="w-full" disabled={isPending}>
          {isPending ? (
            <>
              <span>Loading</span>
              <LoaderCircle className="animate-spin" />
            </>
          ) : (
            "Add Assignment"
          )}
        </Button>
      </form>
    </Form>
  );
}
