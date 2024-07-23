import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import NavBar from '@/components/NavBar';
import Link from 'next/link';

export default function pageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const authCookie = cookies().get('Authorization');
  if (authCookie?.value) {
    redirect('/home');
  } else {
    return (
      <main className="bg-[url('/images/application.jpeg')] min-h-screen bg-no-repeat bg-cover">
        <h1 className="text-center text-4xl text-blue-400 font-[1000] drop-shadow-[2px_2px_var(--tw-shadow-color)] shadow-white">
          <Link href="/">JOBLY</Link>
        </h1>
        {children}
      </main>
    );
  }
}
