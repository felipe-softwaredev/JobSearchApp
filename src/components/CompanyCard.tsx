'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAppContext } from '@/helpers/context';

type CompanyProps = {
  handle: string;
  name: string | null;
  num_employees: number | null;
  description: string | null;
  logo_url?: string | null;
};

export default function CompanyCard({
  handle,
  name,
  description,
  num_employees,
  logo_url,
}: CompanyProps) {
  const router = useRouter();
  const param = useParams<{ handle: string }>();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    router.push(`/companies/${handle}`);
  };

  return (
    <>
      <div className="bg-white text-center border-4 border-blue-400  transition transform hover:scale-105  grid-rows-4 grid rounded-md">
        <div className="flex flex-col">
          <span className="font-semibold">Company: </span>
          <span className="mt-3 text-lg">{name}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold">Description:</span>
          <span>{description}</span>
        </div>
        <div>
          <span className="font-semibold">N. of employee: </span>
          {num_employees}
        </div>

        {!param.handle && (
          <button
            onClick={handleClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-fit m-auto"
          >
            View Jobs
          </button>
        )}
      </div>
    </>
  );
}
