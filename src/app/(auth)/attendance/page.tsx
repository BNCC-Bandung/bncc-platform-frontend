import { AttendaceForm } from "./components/attendance-form";

export default function Attendance() {
  return (
    <div className="layout flex flex-col p-10 h-[calc(100svh-77px)]">
      <div className="flex justify-center items-center h-screen">
        <AttendaceForm />
      </div>
    </div>
  );
}
