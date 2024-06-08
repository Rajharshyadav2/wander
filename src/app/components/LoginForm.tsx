import Button from './Button';
import TextField from './TextField';

/**
 * Props interface for the LoginForm component.
 *
 * @interface loginUserFormProps
 * @property {(formData: FormData) => Promise<void>} [onSubmit] - Function to handle form submission. Expects a Promise that resolves to void.
 * @property {Object.<string, string[]>} [error] - Is optional, Object containing validation errors, if any.
 */
interface loginUserFormProps {
  onSubmit: (formData: FormData) => Promise<void>;
  error?: Record<string, string[]>;
}

const LoginForm = (props: loginUserFormProps) => {
  const {onSubmit} = props;

  return (
    <form action={onSubmit} className="font-semibold">
      <div className="w-4/5 ml-[10%]">
        <TextField
          className="input mt-2 mb-4"
          type="text"
          name="userEmail"
          label="Email"
          placeholder="Enter your Email"
          required
          error=""
        />
        <TextField
          className="input mt-2 mb-4"
          type="password"
          name="userPassword"
          label="Password"
          placeholder="Enter your Password"
          required
          error=""
        />
      </div>

      <Button className="auth-btn">Login</Button>
    </form>
  );
};

export default LoginForm;
