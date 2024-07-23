'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import JoblyAPI from '@/helpers/api';
import { useAppContext } from '@/helpers/context';
import NavBar from '@/components/NavBar';
export default function LoggedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const context = useAppContext();
  const [logged, setLogged] = useState<boolean>(false);

  useEffect(() => {
    async function ensureLoggedIn() {
      const res = await JoblyAPI.ensureLogin();
      if (res.status === 200) {
        const user = await res.json();
        context?.setCurrentUser(user.loggedUser);

        context?.setApplications(user.loggedUser.applications);
        const idsArr = user.loggedUser.applications.map(
          (apps: any) => apps.data.jobId
        );
        context?.setApplicationsId(idsArr);

        setLogged(true);
      } else {
        router.push('/');
      }
    }
    ensureLoggedIn();
  }, []);

  return (
    <main className="bg-slate-800 h-screen">
      {logged && (
        <>
          <NavBar />
          <div className="">{children}</div>
        </>
      )}
    </main>
  );
}
