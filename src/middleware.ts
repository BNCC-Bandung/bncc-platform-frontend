import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authRoutes, protectedRoutes } from "@/lib/route";
import { cookies } from "next/headers";

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isAuthRoute = authRoutes.includes(path);
  const isRefreshRoute = req.nextUrl.searchParams.has("refresh");

  const session = cookies().get("accessToken")?.value;
  const refresh = cookies().get("refreshToken")?.value;

  if (isProtectedRoute && !session && !refresh) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  if (isRefreshRoute) {
    return NextResponse.next();
  }

  if (isProtectedRoute && !session && refresh) {
    const url = req.nextUrl;
    url.searchParams.set("refresh", "true");

    return NextResponse.redirect(url);
  }

  if (isProtectedRoute && session && refresh && isRefreshRoute) {
    const url = req.nextUrl;
    url.searchParams.delete("refresh");

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
