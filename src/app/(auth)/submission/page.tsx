"use client";

import { useUserProfile } from "@/api/api-backend";
import AdminSubmission from "./components/admin-submission";
import UserSubmission from "./components/user-submission";

export default function Submission() {
  const { data: userData } = useUserProfile();
  const isLecturer = userData?.enrollments.some(
    (enrollment) => enrollment.isLecturer
  );

  return (
    <div className="layout flex flex-col p-10 min-h-screen gap-10">
      {isLecturer ? <AdminSubmission /> : <UserSubmission />}
    </div>
  );
}
