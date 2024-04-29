"use client";
import { CourseCard } from "@/components/card/course-card";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookUser, ContactRound, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { data_course } from "./course/page";
import { use, useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { Badge } from "@/components/ui/badge";
import { UserProfile } from "@/components/Dashboard/user-profile";
import { CourseContextProvider } from "@/context/CourseContext";

export default function Dashboard() {
  return (
    <div className="layout flex flex-col p-5 min-h-screen">
      <UserProfile />

      <CourseContextProvider>
        <div className="flex gap-10 mt-10 w-full flex-grow">
          <Card className="w-full h-fit">
            <CardHeader>
              <CardTitle>Upcoming Class</CardTitle>
            </CardHeader>

            <CardContent className="gap-4 flex flex-col ">
              <CourseCard data={data_course} />
              <CourseCard data={data_course} />
            </CardContent>
          </Card>

          <Card className="w-full h-fit">
            <CardHeader>
              <CardTitle>Class Progress</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="flex flex-col gap-4 justify-center items-center h-[400px]">
                <div className="bg-foreground text-background flex justify-center items-center text-4xl font-extrabold font-mono rounded-full w-56 h-56">
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
      </CourseContextProvider>
    </div>
  );
}
