import {Student} from "../../student-profile/models/student-profile.model";
import {Subjects} from "../../tutor-view/models/tutor-view.model";

export interface StudentProfileInfoResponse {
  userId: number;
  profileInfo: Student;
}

export interface SubjectsResponse {
  userId: number;
  subjects: Subjects[];
}
