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
  refreshToken: string;
  userName: string;
}

export enum UserRole {
  student = 2,
  tutor = 1,
}

export interface UserAuthInfo {
  UserId: string;
  aud: string;
  email: string;
  exp: number;
  iss: string;
  jti: string;
  roles: string;
  sub: string;
}
