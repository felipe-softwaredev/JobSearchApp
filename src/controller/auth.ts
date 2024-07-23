import { prisma } from '@/lib/prisma';
import { checkPWD } from '@/lib/bcrypt';

//prisma client

//types

type user = {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  email: string;
};

export async function authenticate(username: string, pwd: string) {
  const user: user | null = await prisma.user.findUnique({
    where: { username: username },
  });
  if (user) {
    const hashedPWD: string = user.password;
    const pwdCheck: boolean = await checkPWD(pwd, hashedPWD);
    if (pwdCheck) {
      return pwdCheck;
    } else {
      throw new Error('Your current password is not a match');
    }
  } else {
    throw new Error('Username not found!');
  }
}
