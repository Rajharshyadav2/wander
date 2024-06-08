'use server';

import UserService from '@/db/db-manager';
import {UserFormData, userValidationSchema} from '@/db/user-validation';
import {StatusCodes} from 'http-status-codes';
import {ZodError} from 'zod';

const userService = new UserService();
/**
 * Asynchronously registers a new user with the provided form data.
 *
 * @async
 * @function
 * @param {FormState} prevState - The previous state of the form.
 * @param {FormData} formData - The form data containing user information.
 * @returns {Promise<{ status: number, message: string, error?: { validationErrors?: { [path: string]: string[] } } }>}
 *   A promise that resolves to an object containing the registration status, message, and optional validation errors.
 */
export const register = async (userData: UserFormData) => {
  try {
    userValidationSchema.parse(userData);
    const userExisted = await userService.getUserByEmail(userData.userEmail);

    if (userExisted !== null) {
      console.log('user conflict');
      return {
        status: StatusCodes.CONFLICT,
        message: 'User Already Exist !!!',
      };
    } else {
      const userCreated = await userService.createUser(userData);

      return {
        status: StatusCodes.CREATED,
        message: 'User Created Successfully',
      };
    }
  } catch (error) {
    if (error instanceof ZodError) {
      const validationErrors = error.errors.reduce(
        (acc, validationError) => {
          const path = validationError.path.join('.');
          acc[path] = acc[path] || [];
          acc[path].push(validationError.message);
          return acc;
        },
        {} as {[path: string]: string[]},
      );
      return {
        status: StatusCodes.BAD_REQUEST,
        message: 'Validation Error',
        error: {...validationErrors},
      };
    } else {
      return {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: 'Registration Failed !!!',
      };
    }
  }
};
