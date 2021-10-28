export interface BasicInformation{
  userId: number;
  hourlyRate: number;
  cancellationId: number;
  tutorSubjects: TutorSubjects[];
  userAddress: UserAddress;
}

export interface TutorSubjects {
  id?: number;
  categoryId: number;
  subjectId: number;
  levelId: number;
  tutorBasicInformationId: number;
}

export interface UserAddress {
  id?: number;
  countryId: number;
  city: string,
  streetNumber: string,
  streetName: string,
  zipCode: string,
  socialSecurityNumber: number;
}
