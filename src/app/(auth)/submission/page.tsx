"use client";
import { useContext } from "react";
import AdminSubmission from "./components/admin-submission";
import UserSubmission from "./components/user-submission";
import { AuthContext } from "@/components/contexts/AuthContextProvider";

export default function Submission() {
  const { userData } = useContext(AuthContext)!;
  return (
    <div className="layout flex flex-col p-10 min-h-screen gap-10">
      {userData.isAdmin ? <AdminSubmission /> : <UserSubmission />}
    </div>
  );
}
