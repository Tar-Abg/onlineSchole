import {Availabilities} from "../../shared/models/registration.model";
import {TutorRatings, TutorReviews} from "../../tutor-profile/models/tutor.model";

export interface TutorProfileInfo {
  userId: number;
  profileInfo: ProfileInfo;
}

export interface ProfileInfo {
  userId: number;
  headline: string;
  photo: string;
  bio: string;
  wrapUp: string;
  hourlyRate: number;
  cancellation: string;
  fullName: string;
  userName: string;
}

export interface InstitutionsResponse {
  userId: number;
  institutions: Institutions[];
}

export interface Institutions {
  id: number;
  userId: number;
  name: string;
  educationalLevel: number;
  level: string;
  countryId: string;
  country: string;
  city: string;
  major: string;
  startDate: string;
  graduationDate: string;
  degreeInProgress: boolean;
}

export interface TutorCertificates {
  userId: number;
  certificatesAndQualifications: Certificates[];
}

export interface Certificates {
  id: number;
  userId: number;
  institutionName: string;
  qualification: string;
  date: string;
  isDeleted: boolean;
}

export interface TutorAvailabilities {
  availabilities: Availabilities[];
  timeZone: string;
}

export interface TutorSubjects {
  subjects: Subjects[];
  userId: number;
}

export interface Subjects {
  id: number;
  userId: number;
  categoryId: number;
  category: string;
  subjectId: number;
  subject: string;
  levelId: number;
  level: string;
}

export interface Reviews {
  userId: number;
  reviews: TutorReviews[];
}

export interface Ratings {
  userId: number;
  ratings: TutorRatings;
}
