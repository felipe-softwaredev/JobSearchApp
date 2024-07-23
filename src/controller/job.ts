import { prisma } from '@/lib/prisma';

//types
type newJob = {
  title: string;
  salary: number;
  equity: number;
  company_handle: string;
};

//functions

export async function jobs() {
  const jobs = await prisma.job.findMany({
    include: { applicants: true },
  });
  return jobs;
}

export async function job(id: number) {
  const job = await prisma.job.findUnique({
    include: { applicants: true },
    where: {
      id: id,
    },
  });
  return job;
}

export async function createJob(requestBody: newJob) {
  const newJob = await prisma.job.create({
    data: requestBody,
  });

  return newJob;
}

export async function updateJob(id: number, requestBody: newJob) {
  const updatedJob = await prisma.job.update({
    where: { id: id },
    data: requestBody,
  });
  return updatedJob;
}

export async function deleteJob(id: number) {
  const deletedJob = await prisma.job.delete({
    where: { id: id },
  });
}
