'use client';
import { useEffect, useState } from 'react';
import { useAppContext } from '@/helpers/context';

export default function User() {
  const context = useAppContext();

  return (
    <div className="bg-[url('/images/application.jpeg')] min-h-screen bg-no-repeat bg-cover">
      <h1 className="text-4xl text-center pt-64 text-purple-500 font-bold drop-shadow-[2px_2px_var(--tw-shadow-color)] shadow-white">
        {' '}
        “Pleasure in the job puts perfection in the work.” - Aristotle
      </h1>
    </div>
  );
}
