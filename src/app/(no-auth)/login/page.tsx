"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import { LoginForm } from "@/components/Login/login-form";
import { LoginFormContextProvider } from "@/context/LoginFormContext";

export default function Login() {
  const { isAuthenticated } = useContext(AuthContext)!;
  const { push } = useRouter();

  if (isAuthenticated) {
    push("/");
  }

  return (
    <div className="flex justify-center items-center h-screen">
      {/* <LoginFormContextProvider> */}
      <LoginForm />
      {/* </LoginFormContextProvider> */}
    </div>
  );
}
