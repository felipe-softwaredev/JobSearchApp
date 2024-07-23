import { type NextRequest, NextResponse } from 'next/server';
import { validateToken } from '@/lib/jwt';
import { user } from '@/controller/user';

export async function GET(request: NextRequest) {
  try {
    const authToken = request.cookies.get('Authorization')?.value.split(' ')[1];
    if (authToken) {
      const tokenResponse: any = await validateToken(authToken);
      if (tokenResponse.verified) {
        const res = await user(tokenResponse.payload.username);
        return NextResponse.json({ loggedUser: res }, { status: 200 });
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
