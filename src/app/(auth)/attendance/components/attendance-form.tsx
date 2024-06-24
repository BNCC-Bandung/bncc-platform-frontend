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

import Image from "next/image";
import StyledLink from "@/components/link/styled-link";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import type { AxiosError } from "axios";

import { useRouter } from "next/navigation";

import { useState } from "react";
import be from "@/api/axios-instance";

const formSchema = z.object({
  NIM: z.string().refine((value) => /^\d{10}$/.test(value), {
    message: "NIM must be a string with exactly 10 numeric characters",
  }),
  fullName: z.string().min(1, { message: "Fullname must not be empty" }),
});

export function AttendaceForm() {
  const [error, setError] = useState("");
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await be.post("/attendances", values);
    } catch (err) {
      const axiosError = err as AxiosError<any>;
      setError(axiosError.response?.data.message);
    }
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
            {error && (
              <FormDescription className="text-red-900">
                {error}
              </FormDescription>
            )}
            <Button className="w-full">Attend</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
