import { AttendanceDetails } from "./components/attendance-details";

export default function AttendancePage({ params }: { params: { id: string } }) {
  const sessionId = Number(params.id);
  return (
    <div className="layout flex flex-col p-10 h-[calc(100svh-77px)]">
      <div className="grid grid-cols-2 gap-8">
        <AttendanceDetails id={sessionId} />
      </div>
    </div>
  );
}
