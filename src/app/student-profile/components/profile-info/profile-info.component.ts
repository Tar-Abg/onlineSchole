import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {StudentProfileService} from "../../services/student-profile.service";
import {Observable, Subscription} from "rxjs";
import {StorageService} from "../../../shared/services/storage/storage.service";
import {StudentSubject, StudentTutors} from "../../models/student-profile.model";

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent implements OnInit, OnDestroy {
  @Input() set wrapUp(value: string | undefined) {
    this.setWrapUp(value);
  };
  private readonly subscription: Subscription = new Subscription();
  subjects$: Observable<StudentSubject[]>;
  studentTutors$: Observable<StudentTutors[]>;
  _wrapUp: string;
  isContentToggled: boolean;
  limit = 160;
  originalContent: string;

  constructor(
    private studentProfileService: StudentProfileService,
    private storageService: StorageService,
  ) { }

  ngOnInit(): void {
    this.getSubjects();
    this.getStudentTutors();
  }

  getSubjects(): void {
    const userId = this.storageService.getUserId();
    this.subjects$ = this.studentProfileService.getSubjects(userId);
  }

  getStudentTutors(): void {
    const userId = this.storageService.getUserId();
    this.studentTutors$ = this.studentProfileService.getStudentTutors(userId);
  }

  setWrapUp(value: string | undefined): void {
    if (value) {
      this.originalContent = value;
      this._wrapUp = value;
      this._wrapUp = this.formatContent(this._wrapUp);
    }
  }

  toggleContent() {
    this._wrapUp = this.formatContent(this._wrapUp);
  }

  formatContent(content: string) {
    if (!this.isContentToggled) {
      if (content.length > this.limit) {
        this.isContentToggled = true;
        return `${content.substr(0, this.limit)}...`;
      } else  {
        return content;
      }
    } else {
      this.isContentToggled = false;
      return this.originalContent;
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
