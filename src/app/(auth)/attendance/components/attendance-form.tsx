"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import {
  attendanceSchema,
  AttendanceSchema,
} from "@/validations/attendance-schema";
import { useAddAttendance } from "@/api/api-backend";

export function AttendaceForm() {
  const { mutateAsync, error } = useAddAttendance();
  const form = useForm<AttendanceSchema>({
    resolver: zodResolver(attendanceSchema),
  });

  async function onSubmit(values: AttendanceSchema) {
    await mutateAsync(values);
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="flex text-2xl font-bold justify-center">
              Attendance Form
            </CardTitle>
            <CardDescription>
              Enter your NIM and Name below to take an attendance.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <FormField
              control={form.control}
              name="NIM"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="text">NIM</FormLabel>
                  <FormControl className="grid gap-2">
                    <Input
                      id="nim"
                      type="text"
                      placeholder="2602123456"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="text">Full Name</FormLabel>
                  <FormControl className="grid gap-2">
                    <Input
                      id="fullname"
                      type="text"
                      placeholder="Akiyama Mizuki"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex-col gap-4">
            <FormDescription className="text-red-900">
              {(error?.response?.data as { message: string })?.message}
            </FormDescription>
            <Button className="w-full">Attend</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
