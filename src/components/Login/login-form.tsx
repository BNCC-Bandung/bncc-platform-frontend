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

import axios from "@/api/axios-instace";
import { AuthContext } from "@/context/AuthContext";
import { useContext, useState } from "react";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export function LoginForm() {
  const { getProfile } = useContext(AuthContext)!;
  const [error, setError] = useState("");
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await axios.post("http://localhost:5000/v1/auth/login", values);
      getProfile();
      setError("");
      router.push("/");
      router.refresh();
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
                Register
              </StyledLink>
            </CardDescription>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
