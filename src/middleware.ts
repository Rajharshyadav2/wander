import {NextResponse, NextRequest} from 'next/server';

/**
 * Middleware function to protect routes by verifying the presence of an access token in cookies.
 *
 * @function
 * @param {NextRequest} request - The incoming request object.
 * @returns {NextResponse} A response object that either continues the request or redirects to the login page.
 */
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
