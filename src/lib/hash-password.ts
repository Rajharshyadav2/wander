import bcrypt from 'bcryptjs';

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
