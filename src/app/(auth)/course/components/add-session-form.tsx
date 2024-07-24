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
import { sessionSchema, SessionSchema } from "@/validations/session-schema";
import { useAddSession } from "@/api/api-backend";

export function FormAddSession({
  courseId,
  setIsOpen,
}: {
  courseId: string;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const { mutateAsync, error, isPending } = useAddSession(courseId, setIsOpen);

  const form = useForm<SessionSchema>({
    resolver: zodResolver(sessionSchema),
  });

  async function onSubmit(values: SessionSchema) {
    await mutateAsync(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="text">Title</FormLabel>
              <FormControl className="grid gap-2">
                <Input
                  id="title"
                  type="text"
                  placeholder="What is React?"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sessionNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="number">Session Number</FormLabel>
              <FormControl className="grid gap-2">
                <Input
                  id="sessionNumber"
                  type="text"
                  inputMode="numeric"
                  placeholder="1"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="startTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="date">Start Time</FormLabel>
              <FormControl className="grid gap-2">
                <Input
                  id="startTime"
                  type="text"
                  placeholder="dd-mm-yyyy hh:mm:ss"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="date">End Time</FormLabel>
              <FormControl className="grid gap-2">
                <Input
                  id="endTime"
                  type="text"
                  placeholder="dd-mm-yyyy hh:mm:ss"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="meetingUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="text">Meeting URL</FormLabel>
              <FormControl className="grid gap-2">
                <Input
                  id="meetingUrl"
                  type="url"
                  placeholder="https://meet.google.com/abc-def-ghi"
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
          ) : (
            <span>Add Session</span>
          )}
        </Button>
      </form>
    </Form>
  );
}
