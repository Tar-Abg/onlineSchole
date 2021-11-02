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
  pdfName: string;
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

export interface SaveWrapUpProfile {
  id: number;
  userId: number;
  headline: string;
  photo: string;
  bio: string;
  wrapUp: string
}

export interface SaveTermsForTutor {
  id: number;
  userId: number;
  legalFirstName: string;
  legalLastName: string
}

export interface Address {
  id?: number;
  userId?: number;
  countryId: number;
  city: string;
  streetNumber: string;
  streetName: string;
  zipCode: string;
  socialSecurityNumber?: number;
}
export interface StudentWantedLessons {
  id: number;
  userId: number;
  sessionsCountId: number;
  isFlexible: true;
  studentSubjects: StudentSubjects[];
  availabilities: Availabilities[];
}

export interface StudentSubjects {
  categoryId: number;
  subjectId: number;
  levelId: number;
  infoId?: number;
}

export interface Availabilities {
  id?: number;
  userId?: number;
  dayId: number;
  partOfDayId: number;
  infoId?: number;
  infoAboutStudentWantedLessonId?: number;
}
export interface CardDetails {
  userId: number;
  cardNumber: string;
  name: string;
  monthId: number;
  year: number;
  cvv: number;
  billingAddress?: BillingAddress;
}

export interface BillingAddress {
  stateId: number;
  streetNumber: string;
  apartment: string;
  zipCode: string;
  city: string;
}
