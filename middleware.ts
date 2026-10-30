import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const session = request.cookies.get('app_session')?.value;
  const isAuthPage = request.nextUrl.pathname.startsWith('/login');

  if (!session && !isAuthPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (session && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Validasi Role untuk rute spesifik (contoh: hanya admin yang bisa akses /pengaturan)
  if (request.nextUrl.pathname.startsWith('/pengaturan') /* && cek role != admin di token JWT */) {
    // return NextResponse.redirect(new URL('/dashboard', request.url)); // Uncomment jika JWT decoder diimplementasi
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
