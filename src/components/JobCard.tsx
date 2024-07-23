'use client';

import { useState, useEffect, useRef } from 'react';
import { useAppContext } from '@/helpers/context';
import { usePathname } from 'next/navigation';
import JoblyAPI from '@/helpers/api';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

type JobCardProps = {
  id: number;
  title: string;
  salary: number | null;
  equity: number | null;
  company_handle: string;
  applicationId?: string;
};

export default function JobCard({
  title,
  salary,
  company_handle,
  id,
  applicationId,
}: JobCardProps) {
  const path = usePathname();
  const context = useAppContext();
  const handleApply = async (id: number) => {
    const applicationBody = {
      jobId: id,
      applicant: context?.currentUser?.username,
    };
    const res = await JoblyAPI.createNew('application', applicationBody);
    if (res.status === 200) {
      const newApplication = await res.json();
      context?.setApplications((prev) => [...prev, newApplication]);
      context?.setApplicationsId((prev) => [
        ...prev,
        newApplication.data.jobId,
      ]);
    } else {
      console.log('application failed');
    }
  };

  const handleDeleteApply = async (e: React.MouseEvent) => {
    const target = e.target as HTMLButtonElement;
    const res = await JoblyAPI.delete('application', target.id);
    context?.setApplications(
      context?.applications?.filter((application: any) => {
        return application.applicationId !== Number(target.id);
      })
    );
    context?.setApplicationsId((prev: any) => {
      return prev?.filter((jobId: number) => jobId !== id);
    });
  };

  return (
    <>
      <div className="text-center border-4 border-blue-400 rounded-md transition ease-in hover:scale-105 bg-white py-4 grid grid-rows-5">
        <span className="font-semibold inline">Title: </span>{' '}
        <span className="inline">{title}</span>
        <span className="font-semibold">Salary: </span> <span>${salary}</span>
        <span className="font-semibold">Company: </span>{' '}
        <span>{company_handle}</span>
        {context?.applicationsId?.includes(id) && (
          <div className="flex flex-col gap-2 w-fit m-auto ">
            <div className="flex gap-3 justify-center border-2 rounded border-green-700 w-fit m-auto px-2">
              <span className="text-green-800 font-bold">Applied</span>
              <CheckCircleIcon style={{ color: 'green' }} />
            </div>
            {path === '/applications' && (
              <button
                id={applicationId}
                onClick={handleDeleteApply}
                className="border-2 rounded  border-red-700 text-red-700 m-auto w-fit px-2 hover:text-white hover:bg-red-700 text-xl"
              >
                Remove application
              </button>
            )}
          </div>
        )}
        {!context?.applicationsId?.includes(id) && (
          <button
            onClick={() => handleApply(id)}
            className="bg-yellow-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-fit m-auto my-2"
          >
            Apply
          </button>
        )}
      </div>
    </>
  );
}
