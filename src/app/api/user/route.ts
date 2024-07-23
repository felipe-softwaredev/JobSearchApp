import { users, createUser } from '@/controller/user';
import { disconnect } from '@/lib/prisma';
import { type NextRequest, NextResponse } from 'next/server';

// types

export async function GET(request: NextRequest) {
  try {
    const res = await users();
    await disconnect();
    return NextResponse.json(res, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 401 });
  }
}
