import { getAllSessions } from "@/api/course-server-context";
import { SessionCard } from "@/components/card/course-card";

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
