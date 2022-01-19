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
  activationStatus: number;
  id: number;
  userType: number;
  warningMessage: string;
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

export enum RegistrationSteps {
  'step-two' = 2,
  'step-three' = 3,
  'step-four' = 4,
  'step-five' = 5,
}

export enum TutorFinaleSteps {
  'step-one' = 8,
  'step-two' = 9,
  'step-three' = 10,
}

