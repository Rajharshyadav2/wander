'use client';
import {useFormStatus} from 'react-dom';
/**
 * Represents the properties of a button component in a React application.
 *
 * @interface ButtonProps
 */
export interface ButtonProps {
  /**
   * The content of the button.
   *
   * @type {React.ReactNode}
   */
  children: React.ReactNode;
  /**
   * The CSS class for styling the button.
   *
   * @type {string} - Classname
   */
  className: string;
  /**
   * The type of the button. Defaults to 'submit'.
   *
   * @type {'submit'} [buttonType]
   */
  buttonType?: 'submit';

  disabled?: boolean;
  /**
   * A function to handle the button click event.
   *
   * @returns {void}
   */
  handleClick?: () => void;
}

const Button = ({
  children,
  className,
  buttonType,
  disabled,
  handleClick,
}: ButtonProps) => {
  const {pending} = useFormStatus();
  return (
    <button
      className={className}
      onClick={handleClick}
      type={buttonType}
      disabled={disabled}
    >
      {pending ? 'Processing...' : children}
    </button>
  );
};

export default Button;
