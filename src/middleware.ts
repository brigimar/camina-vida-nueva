import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  console.log("🧭 MIDDLEWARE PATH:", path);
  console.log(
    "🍪 COOKIES:",
    req.cookies.getAll().map((c) => c.name),
  );

  // permitir login y api
  if (path.startsWith("/api") || path === "/login") {
    return NextResponse.next();
  }

  if (path.startsWith("/dashboard")) {
    const cookies = req.cookies.getAll();

    const hasSession = cookies.some(
      (c) => c.name.startsWith("sb-") && c.name.includes("auth-token"),
    );

    console.log("🔐 SESSION DETECTADA:", hasSession);

    if (!hasSession) {
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
