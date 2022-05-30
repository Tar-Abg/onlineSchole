import {Component, OnDestroy, OnInit} from '@angular/core';
import {StudentViewService} from "../../services/student-view.service";
import {switchMap} from "rxjs/operators";
import {Observable, Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {TutorViewService} from "../../../tutor-view/services/tutor-view.service";
import {StorageService} from "../../../shared/services/storage/storage.service";
import {Student} from "../../../student-profile/models/student-profile.model";
import {Subjects} from "../../../tutor-view/models/tutor-view.model";
import {UserRole} from "../../../shared/models/auth.model";
import {InfosService} from "../../../shared/services/infos/infos.service";
import {AuthService} from "../../../shared/services/auth/auth.service";

@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.scss']
})
export class StudentViewComponent implements OnInit, OnDestroy {
  private readonly subscription: Subscription = new Subscription();
  tutorPaymentExistence$: Observable<boolean>;
  isLoggedIn$: Observable<boolean>;
  studentInfo: Student;
  subjects: Subjects[]

  wrapUp: string;
  originalWrapUpContent: string;
  isWrapUpContentToggled: boolean;
  limit = 150;

  constructor(
    private studentViewService: StudentViewService,
    private route: ActivatedRoute,
    private router: Router,
    private tutorViewService: TutorViewService,
    private storageService: StorageService,
    private infoService: InfosService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.getStudentInfo();
    this.getTutorPaymentExistence();
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

  getTutorPaymentExistence(): void {
    const tutorId = this.storageService.getUserId();
    this.tutorPaymentExistence$ = this.infoService.tutorPaymentExistence(tutorId);
  }

  getStudentInfo(): void {
    this.subscription.add(
      this.route.params.pipe(
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

  openConversation(): void {
    const userRole = UserRole[this.storageService.getItem('userRole')];
    this.router.navigate([`${userRole.toLowerCase()}/profile`], {queryParams: {userId: this.studentInfo.userId}})
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
