'use client';
import JoblyAPI from '@/helpers/api';
import { useRouter } from 'next/navigation';

import { useState } from 'react';

type RegisterForm = {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

export default function RegistrationForm() {
  const router = useRouter();
  const [alert, setAlert] = useState<boolean>(false);
  const [alertMSG, setAlertMSG] = useState<string>('');

  const registerForm: RegisterForm = {
    first_name: '',
    last_name: '',
    email: '',
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
    setAlertMSG('Authenticating...');
    const response = await JoblyAPI.register(formData);
    if (response.status === 200) {
      setAlertMSG('Redirecting...');
      router.push('/home');
    } else if (response.status === 401) {
      const res = await response.json();
      setAlertMSG(res.error);
    }
  };

  const [formData, setFormData] = useState<RegisterForm>(registerForm);
  return (
    <main>
      <div className="flex flex-col pb-2  border-8 rounded  md:w-1/2 content-center mx-auto mt-9 drop-shadow-md text-center  border-blue-400 bg-gradient-to-r from-indigo-500">
        <h1 className="text-center text-2xl text-white font-bold mt-2">
          CREATE AN ACCOUNT
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:w-1/2 m-auto py-6"
        >
          <label htmlFor="first_name" className="text-xl  text-white">
            First Name
          </label>
          <input
            type="text"
            name="first_name"
            id="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
            className="border-blue-600 border-2 rounded"
          />
          <label htmlFor="username" className="text-xl  text-white">
            Last Name
          </label>
          <input
            type="text"
            name="last_name"
            id="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
            className="border-blue-600 border-2 rounded"
          />
          <label htmlFor="email" className="text-xl  text-white">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="border-blue-600 border-2 rounded"
          />
          <label htmlFor="username" className="text-xl  text-white">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="border-blue-600 border-2 rounded"
          />
          <label htmlFor="password" className="text-xl  text-white">
            Password
          </label>
          <input
            type="text"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="border-blue-600 border-2 rounded"
          />
          {alert && (
            <div
              className="bg-purple-100 border-l-4 border-purple-500 text-purple-700 p-2  mt-2 m-auto rounded relative"
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
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-55 m-auto"
          >
            Register
          </button>
        </form>
      </div>
    </main>
  );
}
