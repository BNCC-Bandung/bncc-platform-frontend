"use client";
import { SiJavascript } from "react-icons/si";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import {
  BookMarked,
  Calendar,
  LogIn,
  MoveRight,
  Presentation,
  Timer,
} from "lucide-react";
import { SessionDataType } from "@/types/session-data-type";

import { DateTime } from "luxon";
import Link from "next/link";
import UnstyledLink from "../link/unstyled-link";

interface Props {
  session: SessionDataType;
  isAttendance: boolean;
  isButtonHidden: boolean;
}

export function SessionCard({ session, isAttendance, isButtonHidden }: Props) {
  const { id, title, sessionNumber, courseId, meetingUrl } = session;

  const date = DateTime.fromISO(session.startTime).toFormat("DD");
  const startTime = DateTime.fromISO(session.startTime).toFormat("T");
  const endTime = DateTime.fromISO(session.endTime).toFormat("T");

  const getCourseName = () => {
    if (courseId === 1) {
      return "Backend Programming";
    } else if (courseId === 2) {
      return "Java Programming";
    } else {
      return "Frontend Programming";
    }
  };

  return (
    <Card key={id} className="w-full h-fit flex">
      <SiJavascript className="h-auto w-auto pl-6" size={150} />
      <div className="flex flex-col w-full">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-2 gap-1 space-y-1">
            <CardDescription className="flex items-center gap-1">
              <Calendar size={15} />
              {date}
            </CardDescription>
            <CardDescription className="flex items-center gap-1">
              <Timer size={15} />
              {startTime} - {endTime}
            </CardDescription>
            <CardDescription className="flex items-center gap-1">
              <Presentation size={15} />
              Session {sessionNumber}
            </CardDescription>
            <CardDescription className="flex items-center gap-1">
              <BookMarked size={15} />
              {getCourseName()}
            </CardDescription>
          </div>
        </CardContent>

        <CardFooter className="flex-row">
          <UnstyledLink href={meetingUrl} nextLinkProps={{ passHref: true }}>
            <Button variant="secondary" size="sm" className="w-full gap-2">
              Join Class
              <LogIn size={15} />
            </Button>
          </UnstyledLink>
        </CardFooter>
      </div>
    </Card>
  );
}
