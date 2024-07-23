import { PrismaClient } from '@prisma/client';

//prisma client
export const prisma = new PrismaClient();

//prisma disconnect

export async function disconnect() {
  try {
    await prisma.$disconnect();
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  }
}
