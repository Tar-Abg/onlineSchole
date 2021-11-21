export interface SearchTutor {
  categoryId: number;
  subjectId: number;
  availabilities: string;
  genderId: number;
  minHourlyRate: number;
  maxHourlyRate: number;
  studentLevelId: number;
  sortId: number;
  pageNumber: number;
}

export interface TutorSearchResponse {
  pagesCount: number;
  searchResult: SearchResultForTutor[];
  userId: number;
}

export interface SearchResultForTutor {
  cancelation: string;
  fullName: string;
  hourlyRate: number;
  photo: string;
  profileHeadline: string;
  rating: number;
  tutorId: number;
  tutoredHours: number;
  usersRated: number;
}
