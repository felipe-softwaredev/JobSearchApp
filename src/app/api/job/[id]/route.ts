import { job, jobs } from '@/controller/job';
import { disconnect } from '@/lib/prisma';
import { type NextRequest, NextResponse } from 'next/server';

type params = {
  params: { id: number };
};
export async function GET(request: NextRequest, { params }: params) {
  try {
    const id = Number(params.id);
    const res = await job(id);
    await disconnect();
    return NextResponse.json(res, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 401 });
  }
}
