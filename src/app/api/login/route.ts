import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const { user, pass } = body;

  // Usa variables de entorno (más seguro)
  const VALID_USER = process.env.AUTH_USER;
  const VALID_PASS = process.env.AUTH_PASS;

  if (user === VALID_USER && pass === VALID_PASS) {
    const response = NextResponse.json({ success: true });

    response.cookies.set('auth', 'true', {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // true en Vercel, false en localhost
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 días
    });

    return response;
  }

  return NextResponse.json({ success: false }, { status: 401 });
}