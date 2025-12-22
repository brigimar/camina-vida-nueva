import { type NextRequest, NextResponse } from "next/server";
import { createSupabaseServer } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  const supabase = createSupabaseServer();
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return NextResponse.redirect(
      `${requestUrl.origin}/login?error=Could not authenticate user`,
      { status: 301 },
    );
  }

  return NextResponse.redirect(new URL("/dashboard", request.url), {
    status: 301,
  });
}
