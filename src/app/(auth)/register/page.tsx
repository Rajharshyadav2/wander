import Link from 'next/link';
import RegisterUser from './create-user';

const RegisterPage = async () => {
  return (
    <div className="w-96 mx-auto mt-[2%] py-8 shadow-lg shadow-gray-900 opacity-80 bg-white">
      <h3 className="text-green-900 text-xl text-center font-mono font-black mb-4">
        Register
      </h3>
      <RegisterUser />
      <p className="text-black text-center font-medium">
        Already have an account ? &nbsp;
        <Link href="/login">
          <b className="text-blue-500 font-semibold hover:underline">Login</b>
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
