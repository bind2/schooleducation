import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    // Normalize path (remove trailing slash)
    const normalizedPath = pathname.replace(/\/$/, "");

    // Auth pages: any route starting with /auth/
    const isAuthPage = normalizedPath.startsWith("/auth");

    // Protected admin pages
    const isAdminPage = normalizedPath.startsWith("/admin");

    // 🔒 If user is logged in and visiting an auth page → redirect to /admin
    if (token && isAuthPage) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }

    // 🔐 If user is not logged in and visiting a protected admin page → redirect to /auth/signin
    if (!token && isAdminPage) {
      return NextResponse.redirect(new URL("/auth/signin", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true, // Always run middleware, custom logic decides redirects
    },
  }
);

// Apply middleware to admin and auth routes
export const config = {
  matcher: ["/admin/:path*", "/auth/:path*"],
};
