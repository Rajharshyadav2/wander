'use client';

import Button from './Button';
import TextField from './TextField';

/**
 * Props interface for the RegisterForm component.
 *
 * @interface registerUserFormProps
 * @property {(formData: FormData) => Promise<void>} [onSubmit] - Function to handle form submission. Expects a Promise that resolves to void.
 * @property {Object.<string, string[]>} [error] - Object containing validation errors, if any.
 */
interface registerUserFormProps {
  onSubmit?: (formData: FormData) => Promise<void>;
  error?: Record<string, string[]>;
}

const RegisterForm = (props: registerUserFormProps) => {
  const {onSubmit, error} = props;

  return (
    <form action={onSubmit} className="font-semibold">
      <div className="w-4/5 ml-[10%]">
        <TextField
          className={`input mt-1 ${error?.userName ? 'mb-0' : 'mb-2'}`}
          type="text"
          name="userName"
          label="Name"
          placeholder="Enter your Name"
          required
          error={error?.userName && error?.userName[0]}
        />

        <TextField
          className={`input mt-1 ${error?.userEmail ? 'mb-0' : 'mb-2'}`}
          type="text"
          name="userEmail"
          label="Email"
          placeholder="Enter your Email"
          required
          error={error?.userEmail && error?.userEmail[0]}
        />

        <TextField
          className={`input mt-1 ${error?.userPassword ? 'mb-0' : 'mb-2'}`}
          type="password"
          name="userPassword"
          label="Password"
          placeholder="Enter your Password"
          required
          error={error?.userPassword && error?.userPassword[0]}
        />
      </div>

      <Button className="auth-btn">Register</Button>
    </form>
  );
};

export default RegisterForm;
