import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {PaymentDetail} from "../../../tutor-profile/models/tutor.model";
import {StudentProfileService} from "../../../student-profile/services/student-profile.service";
import {TutorService} from "../../../tutor-profile/services/tutor-service.service";
import {Subscription} from "rxjs";
import {UserRole} from "../../models/auth.model";
import {StorageService} from "../../services/storage/storage.service";
import {FileService} from "../../services/file/file.service";

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.scss']
})
export class PaymentDetailsComponent implements OnInit, OnDestroy {
  readonly subscription: Subscription = new Subscription();
  @Input() paymentDetail: PaymentDetail;
  userRole: string;
  userId: number;

  constructor(
    private studentService: StudentProfileService,
    private tutorService: TutorService,
    private storageService: StorageService,
    private fileService: FileService,
  ) { }

  ngOnInit(): void {
    this.userRole = UserRole[this.storageService.getUserType()];
    this.userId = this.storageService.getUserId();
  }

  printPayment(): void {
    this.userRole === 'student' ? this.printPaymentStudent() : this.printPaymentTutor();
  }

  printPaymentStudent(): void {
    this.subscription.add(
      this.studentService.getCertainPaymentPrintable(this.userId, this.paymentDetail.paymentId).subscribe((data) => {
        this.fileService.download(data.contentType, data.fileContents, data.fileDownloadName);
      })
    )
  }

  printPaymentTutor(): void {
    this.subscription.add(
      this.tutorService.getCertainPaymentPrintable(this.userId, this.paymentDetail.paymentId).subscribe((data) => {
        this.fileService.download(data.contentType, data.fileContents, data.fileDownloadName);
      })
    )

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
