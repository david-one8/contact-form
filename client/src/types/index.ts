export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export interface Submission extends ContactFormData {
  id: number;
  createdAt: string;
}

export interface SubmitResponse {
  id: number;
  message: string;
}

export interface SubmitErrorResponse {
  errors: FormErrors;
}

export interface SubmissionsResponse {
  submissions: Submission[];
}

export const SUBJECT_OPTIONS = [
  'General Inquiry',
  'Technical Support',
  'Feedback',
  'Partnership',
  'Other',
] as const;
