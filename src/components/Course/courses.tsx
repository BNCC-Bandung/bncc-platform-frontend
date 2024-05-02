import { SessionCard } from "../card/course-card";
import { getAllSessions } from "@/api/course-server-context";

export async function Courses() {
  const sessionData = await getAllSessions();

  return (
    <>
      {sessionData &&
        sessionData.map((session, index) => {
          return (
            <SessionCard
              key={index}
              session={session}
              isAttendance={false}
              isButtonHidden={false}
            />
          );
        })}
    </>
  );
}
