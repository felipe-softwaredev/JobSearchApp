import { prisma } from '@/lib/prisma';

//types
type newCompany = {
  handle: string;
  name?: string;
  num_employees?: number;
  description?: string;
  logo_url?: string;
};

type updateCompany = {
  handle?: string;
  name?: string;
  num_emplyees?: number;
  description?: string;
  logo_url?: string;
};
//functions

export async function companies() {
  const companies = await prisma.company.findMany({});
  return companies;
}

export async function company(handle: string) {
  const company = await prisma.company.findUnique({
    include: { jobs: true },
    where: {
      handle: handle,
    },
  });
  return company;
}

export async function createCompany(requestBody: newCompany) {
  const newCompany = await prisma.company.create({
    data: requestBody,
  });

  return newCompany;
}

export async function updateCompany(
  handle: string,
  requestBody: updateCompany
) {
  const updatedCompany = await prisma.company.update({
    where: { handle: handle },
    data: requestBody,
  });
  return updatedCompany;
}

export async function deleteCompany(handle: string) {
  const deletedCompany = await prisma.company.delete({
    where: { handle: handle },
  });
}
