'use client';

import LoginForm from '@/components/LoginForm';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <main>
      <p className="text-center mt-2 text-3xl font-semibold  text-blue-400   drop-shadow-[2px_2px_var(--tw-shadow-color)] shadow-white">
        Welcome to JOBLY. Your website to find the best job opportunities. Login
        and enjoy our services
      </p>
      {/* <div className="flex justify-center mt-3 mb-3">
        <img src="images/jobImage.avif" className="object-cover h-60 w-98" />
      </div> */}
      <div className="flex flex-col border-blue-400 pb-2  border-8 rounded w-3/4 md:w-1/3 content-center mx-auto mt-36 bg-gradient-to-r from-indigo-500">
        <div className="flex justify-center  ">
          <LoginForm />
        </div>
        <span className="text-center text-white">
          {' '}
          New user? Sign up{' '}
          <Link href={'/register'} className="font-bold hover:text-blue-800">
            HERE
          </Link>
        </span>
      </div>
    </main>
  );
}
