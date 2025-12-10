// API Response Types
export interface LoginResponse {
  access: string;
  refresh: string;
}

export interface TokenRefreshResponse {
  access: string;
}

// User Types
export interface User {
  name: string;
  school: string;
  avatar: string;
}

// Teacher Types
export interface Teacher {
  id: number;
  full_name: string;
  email: string;
  subject?: string;
  photo?: string;
}

export interface TeachersResponse {
  results: Teacher[];
  count?: number;
  next?: string | null;
  previous?: string | null;
}

// Class Types
export interface ClassLevel {
  id: number;
  name: string;
  academic_year: string;
}

export interface ClassesResponse {
  results: ClassLevel[];
  count?: number;
  next?: string | null;
  previous?: string | null;
}

// Student Types
export interface StudentRegistrationData {
  admission_number: string;
  date_of_birth: string;
  parent_name: string;
  parent_contact: string;
  parent_email: string;
  address: string;
  class_level: string | null; // Changed to string to match form input value
  academic_year: string;
  profile_picture?: File;
}

// Form Types
export interface LoginFormData {
  email: string;
  password: string;
}

// API Request Types
export type HTTPMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface AuthHeaders {
  Authorization?: string;
  [key: string]: string | undefined;
}

// Hook Return Types
export interface UseFetchReturn<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}