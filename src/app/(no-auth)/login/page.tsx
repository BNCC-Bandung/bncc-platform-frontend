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
import { loginSchema, LoginSchema } from "@/validations/login-schema";
import { useLogin } from "@/api/api-backend";

export default function LoginForm() {
  const { mutate, error, isPending } = useLogin();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(values: LoginSchema) {
    mutate(values);
  }

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-3.5rem)]">
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
                  {(error.response?.data as { message: string })?.message}
                </FormDescription>
              )}

              <Button className="w-full" disabled={isPending}>
                {isPending ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  "Sign in"
                )}
              </Button>
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
    </div>
  );
}
