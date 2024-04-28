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
import StyledLink from "@/components/link/styled-link";

export default function RegisterForm() {
  return (
    <div className="flex justify-center items-center h-screen">
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
            Fill out your information below to create an account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Mizuki Akiyama"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="nim">NIM</Label>
            <Input id="nim" type="number" placeholder="2602123456" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="akiyama.mizuki@binus.ac.id"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              type="text"
              placeholder="Jl. Pasir Kaliki No.25-27"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Phone Number</Label>
            <Input id="telp" type="tel" placeholder="081234567890" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm-pass">Confim Password</Label>
            <Input id="confirm-pass" type="password" required />
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-4">
          <Button className="w-full">Register</Button>
          <CardDescription>
            Already have a BNCC account?{" "}
            <StyledLink href="/login" className="text-blue-400 hover:underline">
              Login
            </StyledLink>
          </CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
}
