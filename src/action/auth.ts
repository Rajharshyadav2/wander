'use server';

import UserService from '@/db/db-manager';
import bcrypt from 'bcryptjs';
import {
  PartialUsersFormData,
  UserFormData,
  userValidationSchema,
} from '@/db/user-validation';
import {generateAccessToken} from '@/lib/helper-func';
import {StatusCodes} from 'http-status-codes';
import {cookies} from 'next/headers';
import {ZodError} from 'zod';

const userService = new UserService();

/**
 * Registers a new user with the provided form data.
 *
 * @async
 * @function
 * @param {UserFormData} userData - The form data containing user information.
 * @returns {Promise<{ status: number, message: string, error?: { [path: string]: string[] } }>}
 *   A promise that resolves to an object containing the registration status, message, and optional validation errors or reject with error if any.
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

/**
 * Authenticates a user with the provided login data.
 *
 * @async
 * @function
 * @param {PartialUsersFormData} userData - The partial form data containing user email and password for login.
 * @returns {Promise<{ status: number, message: string }>}
 *   A promise that resolves to an object containing the login status and message or rejects with error, if occurred.
 */
export const login = async (userData: PartialUsersFormData) => {
  try {
    const isUserExisted = await userService.getUserByEmail(userData.userEmail);
    console.log(isUserExisted);
    if (isUserExisted === null) {
      return {
        status: StatusCodes.BAD_REQUEST,
        message: 'User Not Registered. Please Register !!',
      };
    }

    if (
      !(await bcrypt.compare(
        userData.userPassword,
        isUserExisted!.userPassword,
      ))
    ) {
      return {
        status: StatusCodes.UNAUTHORIZED,
        message: 'Invalid Credentials',
      };
    }

    const token = await generateAccessToken(userData.userEmail);

    cookies().set({
      name: 'access-token',
      value: token,
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 15,
    });

    return {
      status: StatusCodes.OK,
      message: 'login SUccessfull',
    };
  } catch (error) {
    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: 'Login Failed !!!',
    };
  }
};
