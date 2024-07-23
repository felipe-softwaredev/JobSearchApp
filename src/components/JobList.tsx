'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useAppContext } from '@/helpers/context';
import JoblyAPI from '@/helpers/api';
import JobCard from './JobCard';

type Jobs = {
  id: number;
  title: string;
  salary: number | null;
  equity: number | null;
  company_handle: string;
}[];

export default function JobList() {
  let appliedJobsId: number[] | null;
  const context = useAppContext();
  const router = useRouter();
  const [jobList, setJobList] = useState<Jobs | null>(null);
  const [filteredList, setFilteredList] = useState<Jobs | null | undefined>(
    null
  );
  const [filter, setFilter] = useState<string>('');

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFilter(value);
  };

  useEffect(() => {
    async function getJobList() {
      const res = await JoblyAPI.findAll('job');
      if (res.status === 200) {
        const response: Jobs = await res.json();

        setJobList(response);
        setFilteredList(response);
      } else if (res.status === 401) {
        router.push('/login');
      }
    }
    getJobList();
  }, []);

  useEffect(() => {
    if (filter !== '') {
      const filterOnList = jobList?.filter((job) => {
        return job.title.toUpperCase().includes(filter.toUpperCase());
      });
      setFilteredList(filterOnList);
    } else {
      setFilteredList(jobList);
    }
  }, [filter]);

  return (
    <>
      <h1 className="text-white text-4xl text-center">Available jobs</h1>
      <div className=" text-center gap-3 mb-3">
        <h1 className="text-white">Filter by job title</h1>
        <input
          type="text"
          value={filter}
          onChange={handleChange}
          className="rounded w-fit"
        />
      </div>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-5 px-6 pb-10">
        {filteredList?.map((job) => {
          return (
            <JobCard
              key={job.id}
              title={job.title}
              salary={job.salary}
              equity={job.equity}
              id={job.id}
              company_handle={job.company_handle}
            />
          );
        })}
      </div>
    </>
  );
}
