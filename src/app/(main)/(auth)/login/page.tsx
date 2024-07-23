import LoginForm from '@/components/LoginForm';
import RegistrationForm from '@/components/RegistrationForm';

export default function Login() {
  return (
    <main>
      <div className=" w-3/4 md:w-1/2 m-auto border-8 rounded border-blue-400 mt-8 px-20 bg-gradient-to-r from-indigo-500 py-6 ">
        <LoginForm />
      </div>
    </main>
  );
}
