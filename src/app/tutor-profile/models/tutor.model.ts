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
  tutoredHours: string;
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
  meetingLink: string;
  tutor: string;
  subject: string;
  tutorId: number;
  actualStartTime: Date;
  join: boolean;
  message: string;
}

export interface LessonRequest {
  statusId: number;
  from: string;
  to: string;
}

export interface LessonCancelRequest {
  lessonId: number;
  cancelationDescription: string;
  cancelationFee: number;
}

export interface SearchTutor {
  availabilities: string[];
  fullName: string;
  level: string;
  photo: string;
  preferredTimeZone: string;
  registrationDate: string;
  studentId: number;
  subject: string;
  wrapUp: string;
  isOpenDetail?: boolean;
}

export interface LessonHistory {
  lessonsList: Lesson[];
  totalEarned: number;
  totalTime: string;
}

export interface Lesson {
  actualStart: string;
  duration: number;
  earned: number;
  fullName: string;
  hourlyRate: number;
  paymentDate: string;
  studentId: number;
  subjectName: string;
  price: number;
}

export interface TutorForHomePage {
  rate: number;
  subject: string;
  photo: string;
  fullName: string;
  userId: number;
}


export interface TotalPayment {
  amountOwed: number;
  amountPaid: number;
  payPercent: number;
  totalEarnings: number;
}

export interface LastPayment {
  amount: number;
  chargeDate: string;
  duration: string;
  sessionsCount: number;
}

export interface PaymentHistoryResponse {
  totalAmount: number;
  totalPayments: number;
  payments: PaymentHistory[];
}

export interface PaymentHistory {
  amount: number;
  date: string;
  paymentId: number;
  type: string;
}
