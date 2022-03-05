import {Component, OnDestroy, OnInit} from '@angular/core';
import {StudentViewService} from "../../services/student-view.service";
import {switchMap} from "rxjs/operators";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {TutorViewService} from "../../../tutor-view/services/tutor-view.service";
import {StorageService} from "../../../shared/services/storage/storage.service";
import {Student} from "../../../student-profile/models/student-profile.model";
import {Subjects} from "../../../tutor-view/models/tutor-view.model";

@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.scss']
})
export class StudentViewComponent implements OnInit, OnDestroy {
  private readonly subscription: Subscription = new Subscription();
  studentInfo: Student;
  subjects: Subjects[]

  wrapUp: string;
  originalWrapUpContent: string;
  isWrapUpContentToggled: boolean;
  limit = 150;

  constructor(
    private studentViewService: StudentViewService,
    private router: ActivatedRoute,
    private tutorViewService: TutorViewService,
    private storageService: StorageService,
  ) { }

  ngOnInit(): void {
    this.subscription.add(
      this.router.params.pipe(
        switchMap(data => {
          const userId = this.storageService.getUserId();
          this.getSubjects(userId, data.id);
          return this.studentViewService.getStudentProfileInfo(userId, data.id);
        })
      ).subscribe((studentInfo) => {
        this.studentInfo = studentInfo;
        this.setStudentBaseInfo(studentInfo);
      })
    )
  }

  setStudentBaseInfo(studentInfo: Student): void {
    if (studentInfo) {
      this.originalWrapUpContent = studentInfo.wrapUp;
      this.wrapUp = this.formatWrapUpContent(studentInfo.wrapUp, this.originalWrapUpContent);
    }
  }

  getSubjects(userId: number, studentId: number): void {
    this.subscription.add(
      this.studentViewService.getStudentSubjects(userId, studentId).subscribe((subjects) => {
        this.subjects = subjects;
      })
    )
  }

  formatWrapUpContent(content: string, originalContent: string): string {
    if (!this.isWrapUpContentToggled) {
      if (content?.length > this.limit) {
        this.isWrapUpContentToggled = true;
        return `${content.substr(0, this.limit)}...`;
      } else {
        return content;
      }
    } else {
      this.isWrapUpContentToggled = false;
      return originalContent;
    }
  }

  toggleContent(): void {
      this.wrapUp = this.formatWrapUpContent(this.wrapUp, this.originalWrapUpContent);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
