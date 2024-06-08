'use client';

import React from 'react';
import {toast} from 'sonner';
import DOMPurify from 'dompurify';
import {login} from '@/action/auth';
import {redirect} from 'next/navigation';
import {StatusCodes} from 'http-status-codes';
import LoginForm from '@/app/components/LoginForm';

const LoginUser = () => {
  const loginUser = async (formData: FormData) => {
    const {userEmail, userPassword} = Object.fromEntries(formData);
    const sanitizedData = {
      userEmail: DOMPurify.sanitize(userEmail as string),
      userPassword: DOMPurify.sanitize(userPassword as string),
    };

    const response = await login(sanitizedData);

    console.log(response);

    if (response?.status === StatusCodes.OK) {
      toast.success('Logged in Successfully');
      redirect('/');
    }
    if (response?.status === StatusCodes.BAD_REQUEST) {
      toast.warning(response.message);
    }
    if (response?.status === StatusCodes.UNAUTHORIZED) {
      toast.error(response.message);
    }
    if (response.status === StatusCodes.INTERNAL_SERVER_ERROR) {
      toast.error(response.message);
      return;
    }
  };

  return <LoginForm onSubmit={loginUser} />;
};

export default LoginUser;
