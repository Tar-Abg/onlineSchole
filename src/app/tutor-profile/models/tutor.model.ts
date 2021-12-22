export interface TutorBaseInfo {
  bio: string;
  wrapUp: string;
  photo: string;
  headline: string;
  userId: number;
  id: number;
  hourlyRate: number;
  cancellation: string;
  fullName: string;
  userName: string;
}

export interface TutorAvailabilities {
  availabilities: Availability[];
  timeZone: string;

}
interface Availability {
  id: number;
  userId: number;
  dayId: number;
  day: string;
  startHourId: number;
  startHour: string;
  endHourId: number;
  endHour: string;
}

export interface TutorSubjects {
  id: number;
  userId: number;
  categoryId: number;
  category: string;
  subjectId: number;
  subject: string;
  levelId: number;
  level: string;
}

export interface TutorInstitutions {
  id: number;
  userId: number;
  name: number;
  educationalLevel: number;
  level: string;
  countryId: number;
  country: string;
  city: string;
  major: string;
  startDate: string;
  graduationDate: string;
  degreeInProgress: boolean;
}

export interface TutorCertificates {
  id: number;
  userId: number;
  institutionName: string;
  qualification: string;
  date: string;
  isDeleted: boolean;
}

export interface TutorRatings {
  average: number;
  overallCount: number;
  fiveCount: number;
  fourCount: number;
  threeCount: number;
  twoCount: number;
  oneCount: number;
  fiveLine: number;
  fourLine: number;
  threeLine: number;
  twoLine: number;
  oneLine: number;
}

export interface TutorReviews{
  authorName: string;
  review: string;
}

export interface SelectedDay{
  dayId: number;
  endHour: string;
  hourId: number;
  startHour: string;
  subject: string;
}

export interface LessonSchedule {
  actualDuration: string;
  cancel: boolean;
  duration: string;
  end: boolean;
  hourlyRate: number;
  id: number;
  lessonDate: string;
  lessonInterval: string;
  lessonPlan: string;
  start: boolean;
  status: string;
  student: string;
  subject: string;
  tutorId: number;
}
