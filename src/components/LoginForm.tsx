'use client';
import JoblyAPI from '@/helpers/api';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/helpers/context';

import { useState, useEffect } from 'react';

type LoginForm = {
  username: string;
  password: string;
};

export default function LoginForm() {
  const context = useAppContext();
  const router = useRouter();
  const [alert, setAlert] = useState<boolean>(false);
  const [alertMSG, setAlertMSG] = useState<string>('');

  const loginForm: LoginForm = {
    username: '',
    password: '',
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAlert(true);
    setAlertMSG('Loading...');
    const response = await JoblyAPI.login(formData);
    if (response.status === 200) {
      setAlertMSG('Redirecting...');
      router.push('/home');
    } else if (response.status === 401) {
      const res = await response.json();
      setAlert(true);
      setAlertMSG(res.error);
    }
  };

  const [formData, setFormData] = useState<LoginForm>(loginForm);
  return (
    <main>
      <div className="flex flex-wrap justify-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-wrap flex-col gap-2 m-auto"
        >
          <label htmlFor="username" className="text-center text-xl text-white">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleChange}
            className="border-blue-600 border-2 rounded"
          />
          <label htmlFor="password" className="text-center text-xl text-white">
            Password
          </label>
          <input
            type="text"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            className="border-blue-600 border-2 rounded"
          />
          {alert && (
            <div
              className="bg-purple-100 border-l-4 border-purple-500 text-purple-700 p-2  m-auto rounded relative"
              role="alert"
            >
              <div className="flex justify-end">
                <span
                  className=" top-0 bottom-0 right-0  "
                  onClick={() => {
                    setAlert(false), setAlertMSG('');
                  }}
                >
                  <svg
                    className="fill-current h-6 w-6 text-purple-500"
                    role="button"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <title>Close</title>
                    <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                  </svg>
                </span>
              </div>
              <p className="">{alertMSG}</p>
            </div>
          )}

          <button
            type="submit"
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-1/2 m-auto"
          >
            Login
          </button>
        </form>
      </div>
    </main>
  );
}
