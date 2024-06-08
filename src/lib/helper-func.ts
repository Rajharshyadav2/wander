import bcrypt from 'bcryptjs';
import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';
import jwt, {JwtPayload, Secret} from 'jsonwebtoken';

export const generateAccessToken = async (
  userEmail: string,
): Promise<string> => {
  const token = jwt.sign(
    {email: userEmail},
    process.env.ACCESS_TOKEN_SECRET as Secret,
    {
      expiresIn: '1d',
    },
  );

  return token;
};

export const validateAccessToken = async () => {
  try {
    const token = cookies().get('access-token')!.value;

    if (token === undefined) {
      redirect('/login');
    }
    const verifiedToken = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as Secret,
    ) as JwtPayload;

    return verifiedToken;
  } catch (error) {
    return undefined;
  }
};

/**
 * Asynchronously hashes a password using bcrypt.
 *
 * @async
 * @function
 * @param {string} password - The password to be hashed.
 * @returns {Promise<string>} A Promise that resolves to the hashed password or reject if any error occured.
 */
export const hashPasswordMiddleware = async (
  password: string,
): Promise<string> => {
  const hashedPassword = await bcrypt.hash(
    password,
    parseInt(process.env.BYCRYPT_HASH_ROUND as string),
  );
  return hashedPassword;
};
