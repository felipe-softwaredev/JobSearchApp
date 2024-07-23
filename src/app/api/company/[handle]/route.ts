import { updateCompany, deleteCompany, company } from '@/controller/company';
import { disconnect } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

// types

type params = {
  params: { handle: string };
};

type updateCompany = {
  handle?: string;
  name?: string;
  num_emplyees?: number;
  description?: string;
  logo_url?: string;
};

export async function GET(request: NextRequest, { params }: params) {
  try {
    const handle = params.handle;

    const res = await company(handle);
    await disconnect();
    return NextResponse.json(res, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 401 });
  }
}

export async function PATCH(request: NextRequest, { params }: params) {
  try {
    const requestJSON: updateCompany = await request.json();
    const handle = params.handle;
    const res = await updateCompany(handle, requestJSON);
    await disconnect();
    return NextResponse.json(res, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 401 });
  }
}

export async function DELETE(request: NextRequest, { params }: params) {
  try {
    const handle = params.handle;
    await deleteCompany(handle);
    await disconnect();
    return NextResponse.json({ Deleted: handle }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 401 });
  }
}
