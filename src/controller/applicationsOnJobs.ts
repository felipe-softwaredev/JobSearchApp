import { prisma } from '@/lib/prisma';

//types
type newApplication = {
  applicant: string;
  jobId: number;
};

//functions

export async function applications() {
  const applications = await prisma.applicatonsOnJobs.findMany({});
  return applications;
}

export async function application(id: number) {
  const application = await prisma.applicatonsOnJobs.findUnique({
    include: { job: { select: { title: true } }, user: true },
    where: {
      id: id,
    },
  });
  return application;
}

export async function createApplication(requestBody: newApplication) {
  const application = await prisma.applicatonsOnJobs.create({
    data: requestBody,
  });
  const job = await prisma.job.findUnique({
    where: { id: application.jobId },
  });

  const newApplication = {
    applicationId: application.id,
    data: {
      createddAt: application.createddAt,
      jobId: application.jobId,
      job: job,
    },
  };

  return newApplication;
}

export async function updateJob(id: number, requestBody: newApplication) {
  const updatedApplication = await prisma.applicatonsOnJobs.update({
    where: { id: id },
    data: requestBody,
  });
  return updatedApplication;
}

export async function deleteApplication(id: number) {
  const deletedApplication = await prisma.applicatonsOnJobs.delete({
    where: { id: id },
  });
  return 'deleted';
}
