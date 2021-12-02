export interface Login {
  email: string;
  password: string;
}

export interface User {
  email: string;
  isAuthenticated: true
  message: string;
  refreshTokenExpiration: string;
  roles: string[];
  token: string;
  userName: string;
}

export enum UserRole {
  student = 2,
  tutor = 1,
}
