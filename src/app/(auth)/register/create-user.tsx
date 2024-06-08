'use client';

import {register} from '@/action/auth';
import RegisterForm from '@/app/components/RegisterForm';
import {userValidationSchema} from '@/db/user-validation';
import DOMPurify from 'dompurify';
import {StatusCodes} from 'http-status-codes';
import {redirect} from 'next/navigation';
import React, {useState} from 'react';
import {toast} from 'sonner';

const RegisterUser = () => {
  const [error, setError] = useState<Record<string, string[]>>({});

  const registration = async (formData: FormData) => {
    const {userName, userEmail, userPassword} = Object.fromEntries(formData);

    const sanitizedData = {
      userName: DOMPurify.sanitize(userName as string),
      userEmail: DOMPurify.sanitize(userEmail as string),
      userPassword: DOMPurify.sanitize(userPassword as string),
    };

    const parsedResult = userValidationSchema.safeParse(sanitizedData);

    if (!parsedResult.success) {
      setError(parsedResult.error.flatten().fieldErrors);
      return;
    } else {
      setError({});
    }

    const registrationRessponse = await register(parsedResult.data);

    if (registrationRessponse.status === StatusCodes.CONFLICT) {
      toast.warning(registrationRessponse.message);
      return;
    }

    if (registrationRessponse.status === StatusCodes.INTERNAL_SERVER_ERROR) {
      toast.error(registrationRessponse.message);
      return;
    }
    if (registrationRessponse.status === StatusCodes.CREATED) {
      toast.success(registrationRessponse.message);
      redirect('/login');
    }
  };

  return <RegisterForm onSubmit={registration} error={error} />;
};

export default RegisterUser;
