"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import be from "@/api/axios-instace";

export function NavigationEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (searchParams.has("refresh")) {
      be.post("/auth/refresh");
      console.log("refresh");
      router.push(pathname);
      router.refresh();
    }
  }, [pathname, searchParams, router]);

  return null;
}
