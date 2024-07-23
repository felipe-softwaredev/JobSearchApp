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
  const [msg, setMsg] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    const response = await JoblyAPI.update(
      `user/${context?.currentUser?.username}`,
      formData
    );
    if (response.status === 200) {
      const res = await response.json();
      setMsg(res.message);
    } else if (response.status === 401) {
      console.log(await response.json());
    }
  };

  return (
    <div className="flex flex-col gap-3 w-1/2  m-auto text-white font-semibold mt-8 px-8 py-6">
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
                  className="rounded w-3/4 m-auto"
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
                  className="rounded w-3/4 m-auto"
                />
              </div>
            </div>
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
