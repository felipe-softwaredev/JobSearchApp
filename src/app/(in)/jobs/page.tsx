import JobsList from '@/components/JobList';
import { Suspense } from 'react';
import Loading from '@/app/loading';

export default function Jobs() {
  return (
    <div>
      <JobsList />
    </div>
  );
}
