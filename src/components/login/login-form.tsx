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
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import StyledLink from "../link/styled-link";

export function LoginForm() {
  return (
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
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" required />
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-4">
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
  );
}
