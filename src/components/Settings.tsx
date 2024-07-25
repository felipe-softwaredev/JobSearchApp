'use client';
import { useAppContext } from '@/helpers/context';
import { useState } from 'react';
import JoblyAPI from '@/helpers/api';
import { useRouter } from 'next/navigation';

export default function UserSettings() {
  const context = useAppContext();
  const router = useRouter();
  const pwdForm = {
    password: '',
    newPWD: '',
  };

  type newPwdForm = {
    password: string;
    newPWD: string;
  };
  const [formData, setFormData] = useState<newPwdForm>(pwdForm);

  const [alert, setAlert] = useState<boolean>(false);
  const [alertMSG, setAlertMSG] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAlertMSG('Authenticating...');
    setAlert(true);
    const response = await JoblyAPI.update(
      `user/${context?.currentUser?.username}`,
      formData
    );
    const res = await response.json();
    if (response.status === 200) {
      setAlertMSG(res.message);
    } else if (response.status === 401) {
      setAlertMSG('Current password is wrong');
    }
  };

  return (
    <div className="flex flex-col gap-3  w-3/4 md:w-1/2  m-auto text-white font-semibold mt-8 px-8 py-6">
      <h4 className="text-xl">
        Name: {context?.currentUser?.first_name}{' '}
        {context?.currentUser?.last_name}
      </h4>
      <h4 className="text-xl">Username: {context?.currentUser?.username}</h4>
      <h4 className="text-xl">Email: {context?.currentUser?.email}</h4>
      <div className="border-2 rounded py-2">
        <h4 className="text-center my-2">Change password:</h4>
        <div className="content-center">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-rows-2 gap-3">
              <div className="grid grid-cols-1 md:grid-cols-2 px-6 content-center">
                <label
                  htmlFor="password"
                  className="text-center content-center"
                >
                  Confirm your current password
                </label>
                <input
                  type="text"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="rounded w-3/4 m-auto text-black"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 px-6">
                <label htmlFor="newPWD" className="text-center content-center">
                  New Password
                </label>
                <input
                  type="text"
                  id="newPWD"
                  name="newPWD"
                  value={formData.newPWD}
                  onChange={handleChange}
                  className="rounded w-3/4 m-auto text-black"
                />
              </div>
            </div>
            {alert && (
              <div
                className="bg-purple-100 border-l-4 border-purple-500 text-purple-700 p-2  m-2 rounded relative"
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
            <div className="flex justify-center my-5">
              <button
                className="bg-transparent hover:bg-blue-500 text-white font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded m-auto w-fit"
                type="submit"
              >
                Change password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
