'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import CompanyCard from '@/components/CompanyCard';
import JoblyAPI from '@/helpers/api';
import JobCard from '@/components/JobCard';

type Company = {
  description: string;
  name: string;
  handle: string;
  num_employees: number;
  logo_url?: string;
  jobs: {
    id: number;
    equity: number;
    title: string;
    salary: number;
    company_handle: string;
  }[];
};

export default function Company() {
  const param = useParams<{ handle: string }>();
  const [company, setCompany] = useState<Company | null>(null);

  const router = useRouter();
  useEffect(() => {
    async function getCompanyList() {
      const res = await JoblyAPI.findOne('company', param.handle);
      if (res.status === 200) {
        const response = await res.json();
        console.log(response);
        setCompany(response);
      } else if (res.status === 401) {
        router.push('/login');
      }
    }
    getCompanyList();
  }, []);

  return (
    <>
      {company !== null && (
        <>
          <div className="text-white text-center mb-5 flex flex-col gap-4">
            <div className="">
              <span className="mt-3 text-6xl">{company.name}</span>
            </div>
            <div className="">
              <span>&quot{company.description}&quot</span>
            </div>
            <div>
              <span className="font-semibold">N. of employee: </span>
              {company.num_employees}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3 w-2/5 m-auto mb-5">
            {company.jobs &&
              company.jobs.map((job) => {
                return (
                  <JobCard
                    key={job.id}
                    id={job.id}
                    title={job.title}
                    salary={job.salary}
                    equity={job.equity}
                    company_handle={job.company_handle}
                  />
                );
              })}
          </div>
        </>
      )}
    </>
  );
}
