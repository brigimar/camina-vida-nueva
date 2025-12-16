import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Aceptar la cookie de sesión que setea Supabase. Dependiendo de la
  // versión/configuración puede llamarse 'sb', 'sb-access-token',
  // 'sb-refresh-token' o contener 'supabase' en el nombre.
  const all = request.cookies.getAll();
  const hasSession = all.some((c) =>
    c.name.startsWith('sb') ||
    c.name.startsWith('sb-') ||
    c.name.includes('supabase') ||
    c.name.includes('supabase-auth') ||
    c.name.includes('sb:')
  );

  if (!hasSession) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'], // ✅ protege todo lo que empieza con /dashboard
};
