'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import JoblyAPI from '@/helpers/api';
import { useAppContext } from '@/helpers/context';
import NavBar from '@/components/NavBar';
import NavBar2 from '@/components/NavBar2';
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
    <main className="bg-slate-800 min-h-screen">
      {logged && (
        <>
          {/* <NavBar /> */}
          <NavBar2 />
          <div className="mt-2">{children}</div>
        </>
      )}
    </main>
  );
}
