import { NextRequest, NextResponse } from 'next/server';
import { validateToken } from './lib/jwt';

export async function middleware(request: NextRequest) {
  try {
    const authToken = request.cookies.get('Authorization')?.value.split(' ')[1];
    if (authToken) {
      const tokenResponse = await validateToken(authToken);
      if (tokenResponse.verified) {
        return NextResponse.next();
      } else {
        throw new Error('Invalid Token');
      }
    } else {
      throw new Error('Unauthorized');
    }
  } catch (err: any) {
    const response = NextResponse.json({ error: err.message }, { status: 401 });
    response.cookies.delete('Authorization');
    return response;
  }
}

// export const config = {
//   matcher: [
//     '/((?!login|register|api|_next/static|_next/image|favicon.ico|not-found|$).*)',
//   ],
//   matcher: ['/api/user', 'api/company/', 'api/application', 'api/job'],
// };

export const config = {
  matcher: [
    '/api/user',
    '/api/user/:path*',
    '/api/company',
    '/api/company/:path*',
    '/api/application',
    '/api/application/:path*',
    '/api/job',
    '/api/job/:path',
  ],
};
