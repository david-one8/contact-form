import FormField from './FormField';
import SuccessMessage from './SuccessMessage';
import { useContactForm } from '../hooks/useContactForm';
import { SUBJECT_OPTIONS } from '../types';

export default function ContactForm() {
  const {
    formData,
    errors,
    touched,
    isSubmitting,
    submitted,
    submitError,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  } = useContactForm();

  if (submitted) {
    return (
      <div className="mx-auto w-full max-w-xl">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xl shadow-gray-200/50 sm:p-10 dark:border-gray-800 dark:bg-gray-900 dark:shadow-black/20">
          <SuccessMessage onReset={resetForm} />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-xl">
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xl shadow-gray-200/50 sm:p-10 dark:border-gray-800 dark:bg-gray-900 dark:shadow-black/20">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-100 dark:bg-primary-900/30">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 text-primary-600 dark:text-primary-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
            Contact Us
          </h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            We'd love to hear from you. Fill out the form below and we'll get
            back to you promptly.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          noValidate
          className="space-y-5"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField
              label="Name"
              name="name"
              type="text"
              value={formData.name}
              onChange={(v) => handleChange('name', v)}
              onBlur={() => handleBlur('name')}
              error={errors.name}
              touched={touched.name}
              placeholder="John Doe"
              required
            />
            <FormField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={(v) => handleChange('email', v)}
              onBlur={() => handleBlur('email')}
              error={errors.email}
              touched={touched.email}
              placeholder="john@example.com"
              required
            />
          </div>

          <FormField
            label="Subject"
            name="subject"
            type="select"
            value={formData.subject}
            onChange={(v) => handleChange('subject', v)}
            onBlur={() => handleBlur('subject')}
            error={errors.subject}
            touched={touched.subject}
            options={SUBJECT_OPTIONS}
            required
          />

          <FormField
            label="Message"
            name="message"
            type="textarea"
            value={formData.message}
            onChange={(v) => handleChange('message', v)}
            onBlur={() => handleBlur('message')}
            error={errors.message}
            touched={touched.message}
            placeholder="Tell us what's on your mind..."
            required
            showCounter
            minLength={10}
          />

          {/* Submit Error */}
          {submitError && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 flex-shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                {submitError}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary-500/25 transition-all duration-200 hover:bg-primary-700 hover:shadow-primary-500/40 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100 dark:shadow-primary-500/10 dark:hover:shadow-primary-500/20 dark:focus:ring-offset-gray-900"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="h-4 w-4 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Sending...
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                  />
                </svg>
                Send Message
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
