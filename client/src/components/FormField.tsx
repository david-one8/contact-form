interface FormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'select' | 'textarea';
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  error?: string;
  touched?: boolean;
  options?: readonly string[];
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
  showCounter?: boolean;
  minLength?: number;
}

export default function FormField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  touched,
  options,
  placeholder,
  required,
  maxLength,
  showCounter,
  minLength,
}: FormFieldProps) {
  const hasError = touched && error;

  const baseClasses =
    'w-full rounded-xl border bg-white px-4 py-3 text-sm transition-all duration-200 ' +
    'outline-none placeholder:text-gray-400 ' +
    'dark:bg-gray-800 dark:placeholder:text-gray-500 ' +
    (hasError
      ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:border-red-500 dark:focus:ring-red-900'
      : 'border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:border-gray-700 dark:focus:border-primary-400 dark:focus:ring-primary-900');

  const renderInput = () => {
    if (type === 'textarea') {
      return (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          required={required}
          maxLength={maxLength}
          rows={5}
          className={`${baseClasses} resize-none`}
        />
      );
    }

    if (type === 'select') {
      return (
        <select
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          required={required}
          className={`${baseClasses} cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%236b7280%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:20px] bg-[right_12px_center] bg-no-repeat pr-10`}
        >
          <option value="">Select a subject...</option>
          {options?.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      );
    }

    return (
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        required={required}
        maxLength={maxLength}
        className={baseClasses}
      />
    );
  };

  return (
    <div className="space-y-1.5">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      {renderInput()}

      <div className="flex min-h-[20px] items-center justify-between">
        {hasError ? (
          <p className="flex items-center gap-1 text-xs text-red-500 dark:text-red-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5 flex-shrink-0"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </p>
        ) : (
          <span />
        )}
        {showCounter && type === 'textarea' && minLength && (
          <span
            className={`text-xs ${
              value.trim().length < minLength
                ? 'text-gray-400 dark:text-gray-500'
                : 'text-green-500 dark:text-green-400'
            }`}
          >
            {value.trim().length}/{minLength}
          </span>
        )}
      </div>
    </div>
  );
}
