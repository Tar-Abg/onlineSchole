import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {TutorService} from "../../services/tutor-service.service";
import {Subscription} from "rxjs";
import {TutorBaseInfo, TutorCertificates, TutorInstitutions, TutorRatings} from "../../models/tutor.model";

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent implements OnInit, OnDestroy {
  @Input() userId: number;
  tutorCertificates: TutorCertificates[];
  tutorInstitutions: TutorInstitutions[];
  private readonly subscription: Subscription = new Subscription();
  @Input() ratings: TutorRatings | null;
  @Input() set tutorBaseInfo(tutorInfo: TutorBaseInfo) {
    this.setTutorBaseInfo(tutorInfo);
  };
  activeTab: "availability" | "calendar" | "ratings" | "reviews" | "subjects";
  bio: string;
  wrapUp: string;
  originalBioContent: string;
  originalWrapUpContent: string;
  isOpenAddLesson: boolean;
  isBioContentToggled: boolean;
  isWrapUpContentToggled: boolean;
  limit = 150;

  constructor(
    private tutorService: TutorService
  ) { }

  ngOnInit(): void {
    this.initializeSubscriptions();
  }

  setTutorBaseInfo(tutorInfo: TutorBaseInfo): void {
    if (tutorInfo) {
      this.originalBioContent = tutorInfo.bio;
      this.bio = this.formatContent(tutorInfo.bio, this.originalBioContent, 'bio');
      this.originalWrapUpContent = tutorInfo.wrapUp;
      this.wrapUp = this.formatContent(tutorInfo.wrapUp, this.originalWrapUpContent, 'wrapUp');
    }
  }

  getInstitutions(): void {
    this.subscription.add(
      this.tutorService.getInstitutions(this.userId).subscribe((tutorInstitutions: TutorInstitutions[]) => {
        this.tutorInstitutions = tutorInstitutions;
      })
    );
  }

  getCertificates(): void {
    this.subscription.add(
      this.tutorService.getCertificates(this.userId).subscribe((certificates: TutorCertificates[]) => {
        this.tutorCertificates = certificates;
      })
    );
  }

  initializeSubscriptions(): void {
    this.getCertificates();
    this.getInstitutions();
  }

  toggleContent(contentType: string): void {
    if (contentType === 'bio') {
      this.bio = this.formatContent(this.bio, this.originalBioContent, contentType);
    } else {
      this.wrapUp = this.formatContent(this.wrapUp, this.originalWrapUpContent, contentType);
    }
  }

  formatContent(content: string, originalContent: string, type: string) {
    if(type === 'bio') {
      return  this.formatBioContent(content, originalContent);
    } else {
      return this.formatWrapUpContent(content, originalContent);
    }
  }

  formatBioContent(content: string, originalContent: string): string {
    if (!this.isBioContentToggled) {
      if (content?.length > this.limit) {
        this.isBioContentToggled = true;
        return `${content.substr(0, this.limit)}...`;
      } else {
        return content;
      }
    } else {
      this.isBioContentToggled = false;
      return originalContent;
    }
  }

  formatWrapUpContent(content: string, originalContent: string): string {
    if (!this.isWrapUpContentToggled) {
      if (content.length > this.limit) {
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
