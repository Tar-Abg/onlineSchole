export interface Student {
  userId: number;
  photo: string;
  wrapUp: string;
  fullName: string;
  userName: string;
}

export interface StudentSubject {
  id: number;
  userId: number;
  categoryId: number;
  category: string;
  subjectId: number;
  subject: string;
  levelId: number;
  level: string;
}

export interface StudentTutors {
  id: number;
  photo: string;
  fullname: string;
}
