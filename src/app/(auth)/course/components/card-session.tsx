"use client";
import { SiJavascript } from "react-icons/si";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import {
  BookMarked,
  Calendar,
  LogIn,
  Presentation,
  Timer,
  TrashIcon,
} from "lucide-react";
import { SessionDataType } from "@/types/session-data-type";

import { DateTime } from "luxon";
import UnstyledLink from "../../../../components/link/unstyled-link";
import { useDeleteSession } from "@/api/api-backend";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { EditSession } from "./edit-session";

export function SessionCard({
  session,
  isAttendance,
  isButtonHidden,
  isLecturer,
}: {
  session: SessionDataType;
  isAttendance: boolean;
  isButtonHidden: boolean;
  isLecturer: boolean;
}) {
  const { mutateAsync: deleteSession } = useDeleteSession(
    session.courseId,
    session.id
  );

  const { id, title, sessionNumber, courseId, meetingUrl } = session;

  const date = DateTime.fromISO(session.startTime).toFormat("DD");
  const startTime = DateTime.fromISO(session.startTime).toFormat("T");
  const endTime = DateTime.fromISO(session.endTime).toFormat("T");

  const getCourseName = () => {
    if (courseId === "1") {
      return "Backend Programming";
    } else if (courseId === "2") {
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

        {!isButtonHidden && (
          <CardFooter className="flex-row">
            {!isAttendance ? (
              <div className="w-full flex justify-end items-center gap-2">
                {/* Join Button */}
                <UnstyledLink
                  href={meetingUrl}
                  nextLinkProps={{ passHref: true }}
                >
                  <Button variant="secondary" size="sm" className="w-fit gap-2">
                    Join Class
                    <LogIn size={15} />
                  </Button>
                </UnstyledLink>

                {isLecturer && (
                  <>
                    {/* Edit Button */}
                    <EditSession session={session} />

                    {/* Delete Button */}
                    <AlertDialog>
                      <AlertDialogTrigger>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="w-fit gap-2"
                        >
                          <TrashIcon size={15} />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete the session.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-destructive text-foreground"
                            onClick={() => deleteSession()}
                          >
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </>
                )}
              </div>
            ) : (
              <UnstyledLink
                href={`/attendance/${session.id}`}
                nextLinkProps={{ passHref: true }}
                className="w-full justify-end items-center flex gap-2"
              >
                <Button variant="secondary" size="sm">
                  See Attendance
                  <LogIn size={15} />
                </Button>
              </UnstyledLink>
            )}
          </CardFooter>
        )}
      </div>
    </Card>
  );
}
