"use client";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "../ui/dialog";
import { Eye, Download, Plus } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "../ui/card";
import { DialogHeader } from "../ui/dialog";
import { dataAssignmentSubmission } from "./dummy/datadummy";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import be from "@/api/axios-instace";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { Input } from "../ui/input";
import StyledLink from "../link/styled-link";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export function AddAssignment() {
  const [error, setError] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await be.post("http://localhost:5000/v1/auth/login", values);
    } catch (err) {
      const axiosError = err as AxiosError<any>;
      setError(axiosError.response?.data.message);
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <Plus className="mr-1" />
          Add Assignment
        </Button>
      </DialogTrigger>
      <DialogContent className="h-1/2">
        <DialogHeader>
          <DialogTitle>Assignment Submission</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card className="w-full max-w-sm">
              <CardHeader>
                <CardTitle className="flex justify-center">
                  <Image
                    src="/img/logo-lnt.png"
                    width={250}
                    height={40}
                    alt="BNCC Logo"
                  />{" "}
                </CardTitle>
                <CardDescription>
                  Enter your email below to login to your account.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <FormControl className="grid gap-2">
                        <Input
                          id="email"
                          type="email"
                          placeholder="m@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <FormControl className="grid gap-2">
                        <Input id="password" type="password" {...field} />
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
                <Button className="w-full">Sign in</Button>
                <CardDescription>
                  Don&apos;t have a BNCC account?{" "}
                  <StyledLink
                    href="/register"
                    className="text-blue-400 hover:underline"
                  >
                    Contact LnT Staff
                  </StyledLink>
                </CardDescription>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
