import { InputHTMLAttributes } from "react";

interface InputFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "className"> {
  label: string;
  name: string;
  errors?: string;
  touched?: boolean;
  helperText?: string;
}

export default function InputField({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  onBlur,
  errors,
  touched,
  helperText,
  required,
  disabled,
  autoComplete,
  ...props
}: InputFieldProps) {
  const hasError = errors && touched;
  const inputId = `field-${name}`;
  const errorId = `${inputId}-error`;
  const helperId = `${inputId}-helper`;

  return (
    <div className="space-y-2">
      <label
        htmlFor={inputId}
        className="block text-sm font-medium text-gray-200 transition-colors"
      >
        {label}
        {required && (
          <span className="ml-1 text-red-400 animate-pulse" aria-hidden="true">
            *
          </span>
        )}
      </label>

      {helperText && (
        <p id={helperId} className="text-sm text-gray-400 transition-colors">
          {helperText}
        </p>
      )}

      <div className="relative group">
        <input
          id={inputId}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`
            peer w-full rounded-lg border bg-gray-800/90 px-4 py-3 text-base text-white
            placeholder:text-gray-500 placeholder:transition-colors
            transition-all duration-200 ease-out
            hover:border-gray-600
            focus:border-transparent focus:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-gray-900
            disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-gray-700
            ${
              hasError
                ? "border-red-500/70 hover:border-red-500 focus:ring-red-500/50"
                : "border-gray-700/50 focus:ring-blue-500/50"
            }
          `}
          placeholder={placeholder}
          aria-invalid={hasError ? "true" : "false"}
          aria-describedby={
            `
            ${helperText ? helperId : ""}
            ${hasError ? errorId : ""}
          `.trim() || undefined
          }
          required={required}
          disabled={disabled}
          autoComplete={autoComplete}
          {...props}
        />

        <div
          className={`
            absolute inset-0 rounded-lg opacity-0 transition-opacity duration-200
            peer-focus:opacity-100 pointer-events-none
            ${hasError ? "ring-1 ring-red-500/20" : "ring-1 ring-blue-500/20"}
          `}
          aria-hidden="true"
        />
      </div>

      {hasError && (
        <p
          id={errorId}
          className="flex items-center gap-1.5 text-sm font-medium text-red-400 transition-colors"
          role="alert"
          aria-live="polite"
        >
          <svg
            className="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
              clipRule="evenodd"
            />
          </svg>
          {errors}
        </p>
      )}
    </div>
  );
}
