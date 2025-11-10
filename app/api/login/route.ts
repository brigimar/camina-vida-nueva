import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { user, pass } = body;

  const VALID_USER = process.env.AUTH_USER;
  const VALID_PASS = process.env.AUTH_PASS;

  if (user === VALID_USER && pass === VALID_PASS) {
    const response = NextResponse.json({ success: true });
    response.cookies.set("auth", "true", {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });
    return response;
  }
  return NextResponse.json({ success: false }, { status: 401 });
}

export const dynamic = "force-dynamic";
