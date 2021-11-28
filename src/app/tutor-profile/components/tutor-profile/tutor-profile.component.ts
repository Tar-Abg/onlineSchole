import {Component, OnDestroy, OnInit} from '@angular/core';
import {TutorService} from "../../services/tutor-service.service";
import {Observable, Subscription} from "rxjs";
import {TutorBaseInfo, TutorCertificates, TutorInstitutions, TutorRatings} from "../../models/tutor.model";

@Component({
  selector: 'app-tutor-profile',
  templateUrl: './tutor-profile.component.html',
  styleUrls: ['./tutor-profile.component.scss']
})
export class TutorProfileComponent implements OnInit, OnDestroy {
  private readonly subscription: Subscription = new Subscription();
  userId: number = 67; //will be removed
  activeTab: "availability" | "calendar" | "ratings" | "reviews" | "subjects";
  tutorBaseInfo: TutorBaseInfo;
  tutorInstitutions: TutorInstitutions[];
  tutorCertificates: TutorCertificates[];
  ratings$: Observable<TutorRatings>;
  isBioContentToggled: boolean = false;
  isWrapUpContentToggled: boolean = false;
  limit = 150;
  originalBioContent: string;
  originalWrapUpContent: string;
  bio: string;
  wrapUp: string;


  constructor(
    private tutorService: TutorService
  ) {
  }

  ngOnInit(): void {
    this.initializeSubscriptions();
  }

  initializeSubscriptions(): void {
    this.getBaseInfo();
    this.getInstitutions();
    this.getCertificates();
    this.ratings$ = this.tutorService.getRatings(this.userId);
  }

  getBaseInfo(): void {
    this.subscription.add(
      this.tutorService.getTutorBaseInfo(this.userId).subscribe((tutorBaseInfo: TutorBaseInfo) => {
        this.tutorBaseInfo = tutorBaseInfo;
        this.originalBioContent = this.tutorBaseInfo.bio;
        this.bio = this.formatContent(this.tutorBaseInfo.bio, this.originalBioContent, 'bio');
        this.originalWrapUpContent = this.tutorBaseInfo.wrapUp;
        this.wrapUp = this.formatContent(this.tutorBaseInfo.wrapUp, this.originalWrapUpContent, 'wrapUp');
      })
    );
  }

  toggleContent(contentType: string): void {
    if (contentType === 'bio') {
     this.bio = this.formatContent(this.bio, this.originalBioContent, contentType);
    } else {
      this.wrapUp = this.formatContent(this.wrapUp, this.originalWrapUpContent, contentType);
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

  formatContent(content: string, originalContent: string, type: string) {
      if(type === 'bio') {
        return  this.formatBioContent(content, originalContent);
      } else {
        return this.formatWrapUpContent(content, originalContent);
      }
  }

  formatBioContent(content: string, originalContent: string): string {
    if (!this.isBioContentToggled) {
      if (content.length > this.limit) {
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
