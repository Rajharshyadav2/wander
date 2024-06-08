import {NextResponse, NextRequest} from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isTodosPath = path.startsWith('/');

  if (isTodosPath) {
    const token = request.cookies.get('access-token')?.value || '';

    if (!token) {
      return NextResponse.redirect(new URL('/login', request.nextUrl));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/'],
};
