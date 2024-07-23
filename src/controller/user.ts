import { prisma } from '@/lib/prisma';

//types
type newUser = {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  email: string;
};

type updatedUser = {
  username?: string;
  password?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
};

//functions

export async function users() {
  const users = await prisma.user.findMany({});
  return users;
}

export async function user(username: string) {
  const users = await prisma.user.findUnique({
    select: {
      first_name: true,
      last_name: true,
      email: true, // T
      username: true,
      applications: {
        select: {
          id: true,
          createddAt: true,
          jobId: true,
          job: true,
        },
      },
    },
    where: {
      username: username,
    },
  });

  const user = {
    first_name: users?.first_name,
    last_name: users?.last_name,
    email: users?.email,
    username: users?.username,
    applications: users?.applications.map((application) => ({
      applicationId: application.id,
      data: {
        jobId: application.jobId,
        createddAt: application.createddAt,
        job: application.job,
      },
    })),
  };

  return user;
}

export async function createUser(requestBody: newUser) {
  try {
    const newUser = await prisma.user.create({
      data: requestBody,
    });

    return await user(newUser.username);
  } catch (err: any) {
    throw new Error(
      `${err.message
        .split('(')[2]
        .replace(/[^a-zA-Z0-9]/gi, '')
        .toUpperCase()} already registered.`
    );
  }
}

export async function updateUser(username: string, requestBody: updatedUser) {
  try {
    const updatedUser = await prisma.user.update({
      where: { username: username },
      data: requestBody,
    });
    return updatedUser;
  } catch (err: any) {
    throw new Error(
      `${err.message
        .split('(')[2]
        .replace(/[^a-zA-Z0-9]/gi, '')
        .toUpperCase()} already registered.`
    );
  }
}

export async function deleteUser(username: string) {
  const deletedUser = await prisma.user.delete({
    where: { username: username },
  });
}
