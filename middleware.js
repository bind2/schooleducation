import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const authRoutes = [
  "/auth/signin",
  "/auth/signup",
  "/auth/forgot-password",
  "/auth/reset-password",
];

const adminRoutes = ["/admin"];

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  const isAdminRoute = adminRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const isAuthRoute = authRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // ✅ Block unauthenticated access to admin routes
  if (isAdminRoute && !token) {
    const url = req.nextUrl.clone();
    url.pathname = "/auth/signin";
    return NextResponse.redirect(url);
  }

  // ✅ Prevent logged-in users from accessing auth routes
  if (token && isAuthRoute) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin"; // or your dashboard path
    return NextResponse.redirect(url);
  }

  return NextResponse.next(); // Allow other cases
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/auth/signin",
    "/auth/signup",
    "/auth/forgot-password",
    "/auth/reset-password",
  ],
};