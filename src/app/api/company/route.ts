import { companies } from '@/controller/company';
import { disconnect } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { hashPWD } from '@/lib/bcrypt';

// types

type Company = {
  handle: string;
  name: string | null;
  num_employees: number | null;
  description: string | null;
  logo_url: string | null;
}[];

export async function GET(request: NextRequest) {
  try {
    const res = await companies();
    await disconnect();
    return NextResponse.json(res, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 401 });
  }
}
