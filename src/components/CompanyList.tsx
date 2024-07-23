'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useAppContext } from '@/helpers/context';
import JoblyAPI from '@/helpers/api';
import CompanyCard from './CompanyCard';

type Company = {
  handle: string;
  name: string | null;
  num_employees: number | null;
  description: string | null;
  logo_url: string | null;
}[];

export default function CompanyList() {
  const context = useAppContext();
  const router = useRouter();
  const [companyList, setCompanyList] = useState<Company | null>(null);
  const [filteredList, setFilteredList] = useState<Company | null | undefined>(
    null
  );
  const [filter, setFilter] = useState<string>('');

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFilter(value);
  };

  useEffect(() => {
    async function getCompanyList() {
      const res = await JoblyAPI.findAll('company');
      if (res.status === 200) {
        const response: Company = await res.json();
        setCompanyList(response);
        setFilteredList(response);
      } else if (res.status === 401) {
        router.push('/login');
      }
    }
    getCompanyList();
  }, []);

  useEffect(() => {
    if (filter !== '') {
      const j = companyList?.filter((company) => {
        return company.handle.toUpperCase().includes(filter.toUpperCase());
      });
      setFilteredList(j);
    } else {
      setFilteredList(companyList);
    }
  }, [filter]);

  return (
    <>
      <h1 className="text-white text-4xl text-center">List of Companies</h1>
      <div className=" text-center gap-3 mb-3">
        <h1 className="text-white">Filter by company name</h1>
        <input
          type="text"
          value={filter}
          onChange={handleChange}
          className="rounded w-fit"
        />
      </div>

      <div className="grid md:grid-cols-2 grid-cols-1  gap-8 px-8 pb-10">
        {filteredList?.map((company) => {
          return (
            <CompanyCard
              key={company.handle}
              handle={company.handle}
              name={company.name}
              num_employees={company.num_employees}
              description={company.description}
              logo_url={company.logo_url}
            />
          );
        })}
      </div>
    </>
  );
}
