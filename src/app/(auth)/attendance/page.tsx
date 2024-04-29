import StyledLink from "@/components/link/styled-link";
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

export default function Attendance() {
  return (
    <div className="layout flex flex-col p-10 h-[calc(100svh-77px)]">
      <div className="flex justify-center items-center h-screen">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="flex text-2xl font-bold justify-center">
              Attendance Form
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="number">NIM</Label>
              <Input id="nim" type="number" placeholder="2602123456" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="text">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Akiyama Mizuki"
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-4">
            <Button className="w-full">Submit</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
