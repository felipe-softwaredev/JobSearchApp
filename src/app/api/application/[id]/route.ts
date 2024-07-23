import { application } from '@/controller/applicationsOnJobs';
import { disconnect } from '@/lib/prisma';
import { type NextRequest, NextResponse } from 'next/server';
import { deleteApplication } from '@/controller/applicationsOnJobs';

type params = {
  params: { id: number };
};

type newApplication = {
  jobId: number;
  applicant: string;
};
export async function GET(request: NextRequest, { params }: params) {
  try {
    const id = Number(params.id);
    const res = await application(id);
    await disconnect();
    return NextResponse.json(res, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 401 });
  }
}

export async function DELETE(request: NextRequest, { params }: params) {
  try {
    const application = Number(params.id);
    deleteApplication(application);
    await disconnect();
    return Response.json({ Deleted: application });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 401 });
  }
}
