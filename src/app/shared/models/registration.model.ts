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

export interface Preferences {
  id?: number;
  userId: number;
  everTutored: true;
  experienceYears: number;
  everTutoredOnline: true;
  onlineTutoringVariant: string;
  hoursPerWeekCurrently: number;
  wantToBeInstructor: true;
  linkTutorAndStudentTypes: LinkTutorAndStudentTypes[];
  interview: Interview[];
  workHistory: WorkHistory[];
  professionalReferencesForInstructor: ProfessionalReferencesForInstructor[]
}

export interface LinkTutorAndStudentTypes {
  id?: number;
  userId: number;
  studentType: number;
  tutorPreferenceId: number
}

export interface Interview {
  id?: number;
  userId: number;
  dayOfWeek: number;
  startOfRange: number;
  endOfRange: number;
  interviewCompleted: true;
  tutorPreferenceId: number
}
export interface WorkHistory {
  id?: number;
  userId: number;
  schoolOrInstitutionName: string;
  startYear: string;
  endYear: string;
  current: boolean
  tutorPreferenceId: number
}
export interface ProfessionalReferencesForInstructor {
  id?: number;
  userId: number;
  name: string;
  lastName: string;
  emailAddress: string;
  mobilePhone: string;
  tutorPreferenceId: number
}

export interface SaveContacts {
  userId: number;
  email: string;
  mobileCode: number;
  mobile: string;
  linkToSocialMedia: string;
  socialMediaExistance: boolean;
}
