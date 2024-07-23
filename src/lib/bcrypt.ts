import bcrypt from 'bcryptjs';

export async function hashPWD(password: string) {
  const hashedPWD = bcrypt.hashSync(password, 12);
  return hashedPWD;
}

export async function checkPWD(password: string, hash: string) {
  return bcrypt.compareSync(password, hash);
}
