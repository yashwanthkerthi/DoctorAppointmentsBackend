export interface UserSignupDetailsDTO {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface UserLoginDetailsDTO {
  email: string;
  password: string;
}

export interface UserJwtDetailsDTO {
  first_name?: string;
  last_name?: string;
  email?: string;
}

export interface IUsers {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreationIUsersDTO {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

// export interface UserSignupDetailsDTO {
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
// }

export interface ResponseDto {
  status?: boolean;
  data?: any;
  message?: string;
  error?: any;
  details?: string;
  statusCode?: number;
  errorMessage?: any;
  errorDetails?: any;
}

