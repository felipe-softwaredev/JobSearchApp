import { createUser } from '@/controller/user';
import { disconnect } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { hashPWD } from '@/lib/bcrypt';
import { cookies } from 'next/headers';
import { generateToken } from '@/lib/jwt';

// types

type newUser = {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  email: string;
};

export async function POST(request: Request) {
  try {
    const requestJSON: newUser = await request.json();
    requestJSON.password = await hashPWD(requestJSON.password);
    const newUser = await createUser(requestJSON);
    await disconnect();
    const token = await generateToken(requestJSON.username);
    const response = NextResponse.json(
      { message: 'Redirecting...' },
      { status: 200 }
    );
    response.cookies.set('Authorization', `Bearer ${token}`);
    return response;
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 401 });
  }
}
