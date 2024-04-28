import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";

export default function Dashboard() {
  const username = "John Doe";
  return (
    <div className="layout flex flex-col p-10 h-[calc(100svh-77px)]">
      <Card>
        <div className="flex gap-10 p-5">
          <Image
            src="/img/profile.png"
            alt="Dashboard"
            width={300}
            height={100}
          />
          <div className="flex flex-col justify-around w-full">
            <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tighter lg:text-3xl">
              Good afternoon, <span className="text-blue-500">{username}</span>!
            </h1>
            <div className="grid grid-cols-2">
              <div className="flex gap-4 flex-col">
                <div>
                  <p className="text-blue-400 font-bold">BNCC ID</p>
                  <p className="text-muted-foreground">BNCC2403003</p>
                </div>
                <div>
                  <p className="text-blue-400 font-bold">NIM</p>
                  <p className="text-muted-foreground">2602123456</p>
                </div>
                <div>
                  <p className="text-blue-400 font-bold">ADDRESS</p>
                  <p className="text-muted-foreground">Bandung, Indonesia</p>
                </div>
              </div>
              <div>
                <div className="flex gap-4 flex-col">
                  <div>
                    <p className="text-blue-400 font-bold">EMAIL</p>
                    <p className="text-muted-foreground">
                      akiyama.mizuki@binus.ac.id
                    </p>
                  </div>
                  <div>
                    <p className="text-blue-400 font-bold">PHONE NUMBER</p>
                    <p className="text-muted-foreground">081234567890</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="flex gap-10 mt-10 w-full flex-grow">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Upcoming Class</CardTitle>
          </CardHeader>

          <CardContent>
            <CardDescription>
              Looks like you don&apos;t have any upcoming classes.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Class Progress</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="flex flex-col gap-4 justify-center items-center h-[400px]">
              <div className="bg-white text-background flex justify-center items-center text-4xl font-extrabold font-mono rounded-full w-56 h-56">
                0/100
              </div>

              <div className="flex flex-col w-full space-y-2">
                <div className="flex justify-between">
                  <CardDescription>Attendace</CardDescription>
                  <CardDescription>0%</CardDescription>
                </div>
                <Progress value={0} max={100} className="h-2" />
                <div className="flex justify-between">
                  <CardDescription>Submission</CardDescription>
                  <CardDescription>50%</CardDescription>
                </div>
                <Progress value={50} max={100} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
