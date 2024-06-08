import React, {ComponentProps} from 'react';

/**
 * InputFieldProps represents the properties that can be passed to the InputField component.
 *
 * @typedef {Object} InputFieldProps
 * @property {string} type - The type of the input field (e.g., 'text', 'password', 'checkbox', etc.).
 * @property {string} name - The name of the input field.
 * @property {string | undefined} error - The error message associated with the input field, or undefined if no error.
 * @property {string} placeholder - The placeholder text for the input field.
 * @property {string} className - The CSS class names to apply to the input field.
 * @property {(e: React.ChangeEvent<HTMLInputElement>) => void} [onChange] - The function to call when the input value changes.
 */
type TextFieldProps = ComponentProps<'input'> & {
  id?: string;
  type: string;
  name: string;
  label?: string;
  placeholder: string;
  error: string | undefined;
  className: string;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const TextField = ({
  id,
  type,
  name,
  label,
  placeholder,
  error,
  className,
  onChange,
  required,
  ...delegated
}: TextFieldProps) => {
  let actualId = React.useId();
  actualId = id ?? actualId;
  const validTypes = ['text', 'password'];
  const isValidType = validTypes.includes(type);
  return (
    <>
      <label htmlFor={actualId} className="label">
        {label}
        {required && <span className="text-red-600 ml-0.5">*</span>}
      </label>
      <div className={className}>
        <input
          {...delegated}
          id={actualId}
          type={isValidType ? type : 'text'}
          name={name}
          placeholder={placeholder}
          className="bg-[#EEF0E5] border-none rounded-md py-2 px-3 w-full"
          onChange={onChange}
        />
      </div>
      {error ? (
        <p className="text-red-700 text-sm font-medium mb-3">{error}</p>
      ) : null}
    </>
  );
};

export default TextField;
