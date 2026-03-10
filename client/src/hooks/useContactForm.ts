import { useState, useCallback } from 'react';
import type { ContactFormData, FormErrors } from '../types';
import { SUBJECT_OPTIONS } from '../types';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const initialData: ContactFormData = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

function validateField(field: keyof ContactFormData, value: string): string | undefined {
  const v = value.trim();
  switch (field) {
    case 'name':
      if (!v) return 'Name is required';
      if (v.length < 2) return 'Name must be at least 2 characters';
      return undefined;
    case 'email':
      if (!v) return 'Email is required';
      if (!EMAIL_REGEX.test(v)) return 'Invalid email format';
      return undefined;
    case 'subject':
      if (!v) return 'Subject is required';
      if (!SUBJECT_OPTIONS.includes(v as typeof SUBJECT_OPTIONS[number]))
        return 'Please select a valid subject';
      return undefined;
    case 'message':
      if (!v) return 'Message is required';
      if (v.length < 10) return `Message must be at least 10 characters (${v.length}/10)`;
      return undefined;
    default:
      return undefined;
  }
}

function validateAll(data: ContactFormData): FormErrors {
  const errors: FormErrors = {};
  (Object.keys(data) as (keyof ContactFormData)[]).forEach((field) => {
    const err = validateField(field, data[field]);
    if (err) errors[field] = err;
  });
  return errors;
}

export function useContactForm() {
  const [formData, setFormData] = useState<ContactFormData>(initialData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = useCallback(
    (field: keyof ContactFormData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      // Real-time validation for touched fields
      setErrors((prev) => {
        const err = validateField(field, value);
        if (err) return { ...prev, [field]: err };
        const { [field]: _removed, ...rest } = prev;
        void _removed;
        return rest;
      });
    },
    [],
  );

  const handleBlur = useCallback(
    (field: keyof ContactFormData) => {
      setTouched((prev) => ({ ...prev, [field]: true }));
      const err = validateField(field, formData[field]);
      setErrors((prev) => {
        if (err) return { ...prev, [field]: err };
        const { [field]: _removed, ...rest } = prev;
        void _removed;
        return rest;
      });
    },
    [formData],
  );

  const handleSubmit = useCallback(async () => {
    // Mark all fields as touched
    setTouched({ name: true, email: true, subject: true, message: true });

    const validationErrors = validateAll(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.status === 201) {
        setSubmitted(true);
        setFormData(initialData);
        setErrors({});
        setTouched({});
      } else if (res.status === 400) {
        const data = await res.json();
        if (data.errors) setErrors(data.errors);
      } else {
        setSubmitError('Something went wrong. Please try again.');
      }
    } catch {
      setSubmitError('Unable to connect to server. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData]);

  const resetForm = useCallback(() => {
    setFormData(initialData);
    setErrors({});
    setTouched({});
    setSubmitted(false);
    setSubmitError(null);
  }, []);

  return {
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
  };
}
