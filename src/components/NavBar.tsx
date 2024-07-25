'use client';
import { initFlowbite } from 'flowbite';
import { useAppContext } from '@/helpers/context';
import { useEffect, useRef } from 'react';
import JoblyAPI from '@/helpers/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';

export default function NavBar() {
  const divRef = useRef<HTMLUListElement>(null);
  const context = useAppContext();
  const router = useRouter();

  const handleClick = async (e: React.MouseEvent<HTMLElement>) => {
    const res = await JoblyAPI.logOut();
    if (res.status === 200) {
      context?.setCurrentUser(null);
      router.push('/');
    } else {
      console.log("Can't log out now");
    }
  };

  const onToggleMenu = () => {
    const menu = divRef.current;
    menu && menu.classList.toggle('hidden');
  };

  useEffect(() => {
    initFlowbite();
  }, []);

  return (
    <nav className="bg-white p-4">
      <div className="md:flex items-center gap-3 ">
        <div className="flex justify-between">
          <h1 className=" text-4xl text-blue-400 font-[1000]  drop-shadow-[2px_2px_var(--tw-shadow-color)] shadow-black">
            <Link href="/home">JOBLY</Link>
          </h1>
          <div className="flex gap-2 md:gap-0">
            <div className="md:hidden  flex items-center content-center gap-3">
              <MenuIcon
                className=" cursor-pointer content-center "
                style={{ fontSize: '2rem' }}
                onClick={onToggleMenu}
              />
            </div>
            <div className="md:ps-5">
              <button
                id="dropdownHoverButton"
                data-dropdown-toggle="dropdownHover"
                data-dropdown-trigger="hover"
                data-dropdown-delay="100"
                className="text-black hover:bg-blue-800 hover:text-white
              border-blue-600 border-solid border-2  text-lg focus:outline-none focus:ring-blue-300 font-medium rounded-lg  px-2 py-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 h-fit "
                type="button"
              >
                {context?.currentUser?.first_name}
                <svg
                  className="w-2.5 h-2.5 ms-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <ul
          ref={divRef}
          className=" hidden md:flex items-center  md:gap-4 nav-links ps-4 py-3 md:p-0 "
        >
          <li className="py-1 md:py-0">
            <Link className="hover:text-gray-500" href="/companies">
              Companies
            </Link>
          </li>
          <li className="py-1 md:py-0">
            <Link className="hover:text-gray-500" href="/jobs">
              Jobs
            </Link>
          </li>
          <li className="py-1 md:py-0">
            <Link className="hover:text-gray-500" href="/applications">
              Applications
            </Link>
          </li>
        </ul>
      </div>
      {/* <button
        id="dropdownHoverButton"
        data-dropdown-toggle="dropdownHover"
        data-dropdown-trigger="hover"
        data-dropdown-delay="100"
        className="text-black hover:bg-blue-800 hover:text-white
              border-blue-600 border-solid border-2  text-lg focus:outline-none focus:ring-blue-300 font-medium rounded-lg  px-2 py-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 h-fit "
        type="button"
      >
        {context?.currentUser?.first_name}
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button> */}

      <div
        id="dropdownHover"
        className="z-10 hidden bg-white bg-opacity-95 divide-y divide-gray-100 rounded-lg shadow w-37 dark:bg-gray-700"
      >
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownHoverButton"
        >
          <li>
            <a
              href="/home"
              className="block px-4 py-2 hover:bg-white dark:hover:bg-gray-600 dark:hover:text-white hover:font-semibold"
            >
              Home
            </a>
          </li>
          <li>
            <Link
              href="/settings"
              className="block px-4 py-2 hover:bg-white dark:hover:bg-gray-600 dark:hover:text-white hover:font-semibold"
            >
              Settings
            </Link>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-white dark:hover:bg-gray-600 dark:hover:text-white hover:font-semibold"
              onClick={handleClick}
            >
              Sign out
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
