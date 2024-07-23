'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useAppContext } from '@/helpers/context';
import JoblyAPI from '@/helpers/api';
import JobCard from './JobCard';

type applicationType = {
  createddAt: Date | null;
  jobId: number;
  job: {
    id: number;
    title: string;
    salary: number | null;
    equity: number | null;
    company_handle: string;
  };
};

export default function ApplicationList() {
  const context = useAppContext();

  return (
    <>
      {context?.applications ? (
        <>
          <h1 className="text-white text-4xl text-center">
            Your job applications:
          </h1>
          <div className="grid grid-cols-1 gap-3 mt-8 w-1/3 m-auto pb-4">
            {context?.applications?.map((application: any) => {
              return (
                <JobCard
                  key={application.data.job.id}
                  title={application.data.job.title}
                  salary={application.data.job.salary}
                  equity={application.data.job.equity}
                  id={application.data?.job.id}
                  company_handle={application.data.job.company_handle}
                  applicationId={application.applicationId}
                />
              );
            })}
          </div>
        </>
      ) : (
        <h2>
          {' '}
          <h1 className="text-white text-4xl text-center mt-4">
            No current applications
          </h1>
        </h2>
      )}
    </>
  );
}
