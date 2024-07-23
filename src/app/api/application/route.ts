import { disconnect } from '@/lib/prisma';
import { applications } from '@/controller/applicationsOnJobs';
import { createApplication } from '@/controller/applicationsOnJobs';
import { type NextRequest, NextResponse } from 'next/server';

type newApplication = {
  applicant: string;
  jobId: number;
};

export async function GET(request: NextRequest) {
  try {
    const res = await applications();
    await disconnect();

    return NextResponse.json(res, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 401 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const requestJSON: newApplication = await request.json();
    const res = await createApplication(requestJSON);

    await disconnect();

    return NextResponse.json(res, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 401 });
  }
}
