import { user, updateUser, deleteUser } from '@/controller/user';
import { disconnect } from '@/lib/prisma';
import { type NextRequest, NextResponse } from 'next/server';
import { authenticate } from '@/controller/auth';

import { hashPWD } from '@/lib/bcrypt';

// types

type params = {
  params: { username: string };
};

type updateUser = {
  username?: string;
  password?: string;
  newPWD?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
};

export async function GET(request: NextRequest, { params }: params) {
  try {
    const username = params.username;
    const res = await user(username);
    await disconnect();
    return Response.json(res, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 401 });
  }
}

export async function PATCH(request: NextRequest, { params }: params) {
  try {
    let res;
    const requestJSON: updateUser = await request.json();
    const username = params.username;
    if (requestJSON.password && requestJSON.newPWD) {
      const resAuth = await authenticate(username, requestJSON.password);
      console.log(resAuth);
      if (resAuth) {
        requestJSON.password = await hashPWD(requestJSON.newPWD);
        delete requestJSON.newPWD;
      }
    }
    res = await updateUser(username, requestJSON);
    return NextResponse.json({ message: 'Password changed!' }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 401 });
  }
}

export async function DELETE(request: NextRequest, { params }: params) {
  try {
    const username = params.username;
    await deleteUser(username);
    await disconnect();
    return Response.json({ Deleted: username });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 401 });
  }
}
