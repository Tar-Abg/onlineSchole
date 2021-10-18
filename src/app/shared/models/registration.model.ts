export interface SaveInformation {
  id?: number;
  firstName: string;
  lastName: string;
  gender: number;
  monthOfBirth: number;
  yearOfBirth: number;
  email: string;
  password?: string;
  rePassword?: string;
  userPassword: {
    password: string;
  }
}

export interface SaveInstitutions {
  id: number;
  userId: number;
  name: string;
  educationalLevel: number;
  countryId: number;
  city: string;
  major: string;
  startDate: string;
  graduationDate: string;
  degreeInProgress: boolean;
}

export interface SaveCertificates {
  id: number;
  userId: number;
  institutionName: string;
  qualification: string;
  date: string;
}
