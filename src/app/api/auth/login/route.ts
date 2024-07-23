import { disconnect } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { authenticate } from '@/controller/auth';
import { headers } from 'next/headers';
import { generateToken } from '@/lib/jwt';

export async function POST(request: NextRequest) {
  const requestJSON = await request.json();
  const { username, password } = requestJSON;
  try {
    const authRes = await authenticate(username, password);
    await disconnect();
    if (authRes) {
      const token = await generateToken(username);
      const response = NextResponse.json(
        { message: 'Redirecting...' },
        { status: 200 }
      );
      response.cookies.set('Authorization', `Bearer ${token}`);
      return response;
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 401 });
  }
}
