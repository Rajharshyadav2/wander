import {redirect} from 'next/navigation';
import UserService from '@/db/db-manager';
import {validateAccessToken} from '@/lib/helper-func';

export default async function Home() {
  let user;
  const isValidToken = async () => {
    const tokenDecodedValue = await validateAccessToken();
    if (tokenDecodedValue === undefined) {
      redirect('/login');
    }
    const userService = new UserService();
    const userData = await userService.getUserByEmail(tokenDecodedValue.email);
    user = String(userData.userName).toUpperCase();
    console.log(user);
  };
  await isValidToken();

  return (
    <div className="p-[20%]">
      <h1 className="text-center font-bold text-green-700 text-2xl">
        Welcome to Project Mr/Mrs. {user}{' '}
      </h1>
    </div>
  );
}
